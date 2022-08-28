import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../../folder/folder.model";
import { SignatureUpdate } from "../dto/update-signatures.dto";
import { SignatureOLD, SignatureDocument } from "../signature-OLD.model";
import { Signature } from "../signature.model";
import { isWormhole } from "../signature.utils";
import { SignatureNode } from "../neo/signature.node";
import { WormholeService } from "./wormhole.service";
import { SystemNode } from "../neo/system.node";
import { CreatableSignature } from "../dto/add-signatures.dto";
import addUuid from "../../../utils/addUuid";

// TODO: Move signatures completely to Neo4j. Queries in connection graph module, call them here, etc.

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(SignatureOLD.name) private sigModel: Model<SignatureDocument>,
    private wormholeService: WormholeService,
    private signatureNode: SignatureNode,
    private systemNode: SystemNode,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.signatureNode.findBySystem({ systemName, folderId: folder.id });
  }

  async createSignatures(signatures: CreatableSignature[], folder: Folder): Promise<Signature[]> {
    /*
    const sigsWithWhTypes = signatures.map((sig) => this.wormholeService.addWhTypes(sig));
    const newSigs = await this.sigModel.create(sigsWithWhTypes);
    const sigsWithReverses = await this.wormholeService.addReverseWormholes(newSigs);
    return sigsWithReverses;
    */
    // Create systems
    const sigsWithIds = signatures.map((sig) => addUuid(sig, { overwrite: true }));
    await this.ensureSystemsExist(sigsWithIds, folder.id);
    // Create sigs
    await this.signatureNode.createSignatures(sigsWithIds, folder.id);
    const sigsWithConnections = sigsWithIds.filter((sig) => sig.connection);
    await this.signatureNode.createConnections(sigsWithConnections, folder.id);
    return [];
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

  private async ensureSystemsExist(signatures: Signature[], folderId: string) {
    const hostSystems = signatures.map((sig) => sig.systemName);
    const destinations = signatures
      .filter((sig) => sig.connection)
      .map((sig) => sig.connection.destinationName);

    const uniqueSystems = [...new Set(hostSystems.concat(destinations))];
    const insertableSystems = uniqueSystems.map((name) => ({ name, folderId }));
    await this.systemNode.upsertSystems(insertableSystems);
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
