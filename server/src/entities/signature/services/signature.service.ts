import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../../folder/folder.model";
import { SignatureOLD, SignatureDocument } from "../signature-OLD.model";
import { Signature } from "../signature.model";
import { isWormhole } from "../signature.utils";
import { WormholeService } from "./wormhole.service";
import { CreatableSignature } from "../dto/add-signatures.dto";
import { addUuidToSignatureAndReverseSignature } from "../../../utils/addUuid";
import { SignatureSearchService } from "../neo/signature-search.service";
import { SignatureMutationService } from "../neo/signature-mutation.service";
import { ConnectionMutationService } from "../neo/connection-mutation.service";
import { SystemMutationService } from "../neo/system-mutation.service";
import SigType from "../enums/sig-type.enum";
import { set } from "lodash";
import uuid from "../../../utils/uuid";
import { UpdateableSignature } from "../dto/update-signatures.dto";

// TODO: Move signatures completely to Neo4j. Queries in connection graph module, call them here, etc.

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(SignatureOLD.name) private sigModel: Model<SignatureDocument>,
    private wormholeService: WormholeService,
    private signatureSearchService: SignatureSearchService,
    private signatureMutationService: SignatureMutationService,
    private connectionMutationService: ConnectionMutationService,
    private systemMutationService: SystemMutationService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.signatureSearchService.findBySystem({ systemName, folderId: folder.id });
  }

  async createSignatures(signatures: CreatableSignature[], folder: Folder): Promise<Signature[]> {
    const sigsWithIds = signatures.map(addUuidToSignatureAndReverseSignature);
    const graphSafeSigs = sigsWithIds.map(
      this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem,
    );
    await this.signatureMutationService.createSignatures(graphSafeSigs, folder.id);

    const wormholes = graphSafeSigs.filter((sig) => sig.type === SigType.WORMHOLE);
    await this.connectionMutationService.createConnectionsFromSignatures(wormholes);

    return sigsWithIds;
  }

  async updateSignatures(sigUpdates: UpdateableSignature[], folder: Folder): Promise<Signature[]> {
    // FIXME: Folder ID must be checked to match user's ActiveFolder ID, otherwise folder security depends only on sig ID.
    const ids = sigUpdates.map((sig) => sig.id);
    const oldSigs = await this.signatureSearchService.findManyById(ids);

    return Promise.all(
      sigUpdates.map(async (update) =>
        this.updateSignature(
          update,
          oldSigs.find((sig) => sig.id === update.id),
          folder,
        ),
      ),
    );
  }

  /**
   * Delete signatures and their possible reverse wormholes by ID.
   * @param ids IDs of the Signatures to delete.
   * @returns Deleted Signatures (not including possible deleted reverse wormholes).
   */
  async deleteSignatures(ids: string[]): Promise<Signature[]> {
    return this.signatureMutationService.deleteSignatures(ids);
  }

  // FIXME: Fix type after all cases have been updated.
  private async updateSignature(
    update: UpdateableSignature,
    old: Signature,
    folder: Folder,
  ): Promise<any> {
    if (!isWormhole(old) && isWormhole(update)) {
      const sigWithReverseId = set(update, "connection.reverseSignature.id", uuid());
      const graphSafeSig =
        this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem(sigWithReverseId);

      await this.signatureMutationService.createSignatures(
        [graphSafeSig.connection.reverseSignature],
        folder.id,
      );

      const updateResult = await this.signatureMutationService.updateSignatures([graphSafeSig]);
      await this.connectionMutationService.createConnectionsFromSignatures([graphSafeSig]);
      // FIXME: Return updated sig with connection info (requires modifications to signatureSearchService.findManyById).
      return updateResult[0];
    }

    if (isWormhole(old) && !isWormhole(update)) {
      //await this.sigModel.findByIdAndDelete(old.reverse);
      return this.sigModel.findOneAndUpdate(
        { id: update.id },
        { ...update, reverse: null },
        { returnDocument: "after" },
      );
    }

    if (isWormhole(old) && isWormhole(update)) {
      const sigWithWhTypes = this.wormholeService.addWhTypes(update);
      const updatedSig = await this.sigModel.findOneAndUpdate(
        { id: sigWithWhTypes.id },
        sigWithWhTypes,
        {
          returnDocument: "after",
        },
      );
      await this.wormholeService.syncReverseWormhole(updatedSig);
      return updatedSig;
    }

    return this.signatureMutationService.updateSignatures([update]);
  }
}
