import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../../folder/folder.model";
import { SignatureUpdate } from "../dto/update-signatures.dto";
import { SignatureOLD, SignatureDocument } from "../signature-OLD.model";
import { Signature } from "../signature.model";
import { isWormhole } from "../signature.utils";
import { WormholeService } from "./wormhole.service";
import { CreatableSignature } from "../dto/add-signatures.dto";
import addUuid from "../../../utils/addUuid";
import { SignatureSearchService } from "../neo/signature-search.service";
import { SignatureMutationService } from "../neo/signature-mutation.service";
import { ConnectionMutationService } from "../neo/connection-mutation.service";

// TODO: Move signatures completely to Neo4j. Queries in connection graph module, call them here, etc.

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(SignatureOLD.name) private sigModel: Model<SignatureDocument>,
    private wormholeService: WormholeService,
    private signatureSearchService: SignatureSearchService,
    private signatureMutationService: SignatureMutationService,
    private connectionMutationService: ConnectionMutationService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.signatureSearchService.findBySystem({ systemName, folderId: folder.id });
  }

  async createSignatures(signatures: CreatableSignature[], folder: Folder): Promise<Signature[]> {
    const sigsWithIds = signatures.map((sig) => addUuid(sig, { overwrite: true }));

    await this.signatureMutationService.createSignatures(sigsWithIds, folder.id);

    const sigsWithConnections = sigsWithIds.filter((sig) => sig.connection);
    await this.connectionMutationService.createConnections(sigsWithConnections, folder.id);

    return sigsWithIds;
  }

  async updateSignatures(sigUpdates: SignatureUpdate[]): Promise<SignatureOLD[]> {
    const ids = sigUpdates.map((sig) => sig.id);
    const oldSigs = await this.sigModel.find({ id: { $in: ids } });

    return Promise.all(
      sigUpdates.map(async (update) =>
        this.updateSignature(
          update,
          oldSigs.find((sig) => sig.id === update.id),
        ),
      ),
    );
  }

  /**
   * Delete signatures and their possible reverse wormholes by ID.
   * @param ids IDs of the Signatures to delete.
   * @returns Deleted Signatures (not including possible deleted reverse wormholes).
   */
  async deleteSignatures(ids: string[]): Promise<SignatureOLD[]> {
    const sigs = await this.sigModel.find({ id: { $in: ids } }).populate("reverse");
    const deletableIds = sigs.reduce(
      (res, sig) => (sig.reverse ? res.concat(sig.reverse.id) : res),
      ids,
    );

    await this.sigModel.deleteMany({ id: { $in: deletableIds } });
    return sigs;
  }

  private async updateSignature(
    update: SignatureUpdate,
    old: SignatureDocument,
  ): Promise<SignatureOLD> {
    if (!isWormhole(old) && isWormhole(update)) {
      const sigWithWhTypes = this.wormholeService.addWhTypes(update);
      const updatedSig = await this.sigModel.findOneAndUpdate(
        { id: sigWithWhTypes.id },
        sigWithWhTypes,
        {
          returnDocument: "after",
        },
      );
      return this.wormholeService.addReverseWormhole(updatedSig);
    }

    if (isWormhole(old) && !isWormhole(update)) {
      await this.sigModel.findByIdAndDelete(old.reverse);
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

    return this.sigModel.findOneAndUpdate({ id: update.id }, update, { returnDocument: "after" });
  }
}
