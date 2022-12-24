import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../../folder/folder.model";
import { SignatureOLD, SignatureDocument } from "../signature-OLD.model";
import { Signature } from "../signature.model";
import { isWormhole } from "../signature.utils";
import { CreatableSignature } from "../dto/add-signatures.dto";
import { addUuid, addUuidToSignatureAndReverseSignature } from "../../../utils/addUuid";
import { SignatureSearchService } from "../neo/signature-search.service";
import { SignatureMutationService } from "../neo/signature-mutation.service";
import { ConnectionMutationService } from "../neo/connection-mutation.service";
import { SystemMutationService } from "../neo/system-mutation.service";
import SigType from "../enums/sig-type.enum";
import { set } from "lodash";
import uuid from "../../../utils/uuid";
import { UpdateableSignature } from "../dto/update-signatures.dto";
import { addK162 } from "../../../utils/addK162";

// TODO: Move signatures completely to Neo4j. Queries in connection graph module, call them here, etc.

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(SignatureOLD.name) private sigModel: Model<SignatureDocument>,
    private signatureSearchService: SignatureSearchService,
    private signatureMutationService: SignatureMutationService,
    private connectionMutationService: ConnectionMutationService,
    private systemMutationService: SystemMutationService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.signatureSearchService.findBySystem({ systemName, folderId: folder.id });
  }

  async createSignatures(signatures: CreatableSignature[], folder: Folder): Promise<Signature[]> {
    const sigsWithIds = signatures.map(addUuidToSignatureAndReverseSignature).map(addK162);
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

      await this.signatureMutationService.updateSignatures([graphSafeSig]);
      await this.connectionMutationService.createConnectionsFromSignatures([graphSafeSig]);
      const results = await this.signatureSearchService.findManyById([graphSafeSig.id]);
      return results[0];
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
      // Destination not changed.
      if (
        old.connection.reverseSignature.systemName === update.connection.reverseSignature.systemName
      ) {
        const modifiedUpdate = addK162(update);
        await this.signatureMutationService.updateSignatures([
          modifiedUpdate,
          modifiedUpdate.connection.reverseSignature,
        ]);
        return this.connectionMutationService.updateConnection(modifiedUpdate);
      }

      // Destination changed: Recreate connection and reverse signature.
      const newReverseSig = addUuid(update.connection.reverseSignature, { overwrite: true });
      const updatedSig = addK162(set(update, "connection.reverseSignature", newReverseSig));

      await this.signatureMutationService.updateSignatures([updatedSig]);
      await this.signatureMutationService.deleteSignatures([old.connection.reverseSignature.id]);

      await this.signatureMutationService.createSignatures(
        [updatedSig.connection.reverseSignature],
        folder.id,
      );
      await this.connectionMutationService.createConnectionsFromSignatures([updatedSig]);

      return updatedSig;
    }

    const res = await this.signatureMutationService.updateSignatures([update]);
    return res[0];
  }
}
