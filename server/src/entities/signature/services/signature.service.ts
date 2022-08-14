import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../../folder/folder.model";
import { Signature, SignatureDocument } from "../signature.model";
import { isWormhole } from "../signature.utils";
import { WormholeService } from "./wormhole.service";

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(Signature.name) private sigModel: Model<SignatureDocument>,
    private wormholeService: WormholeService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.sigModel.find({ systemName, folder }).populate("reverse");
  }

  async createSignatures(signatures: Signature[]): Promise<Signature[]> {
    const sigsWithWhTypes = signatures.map((sig) => this.wormholeService.addWhTypes(sig));
    const newSigs = await this.sigModel.create(sigsWithWhTypes);
    const sigsWithReverses = await this.wormholeService.addReverseWormholes(newSigs);
    return sigsWithReverses;
  }

  async updateSignatures(sigUpdates: Signature[]): Promise<Signature[]> {
    const ids = sigUpdates.map((sig) => sig.id);
    const oldSigs = await this.sigModel.find({ $id: { in: ids } });

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
  async deleteSignatures(ids: string[]): Promise<Signature[]> {
    const sigs = await this.sigModel.find({ id: { $in: ids } }).populate("reverse");
    const deletableIds = sigs.reduce(
      (res, sig) => (sig.reverse ? res.concat(sig.reverse.id) : res),
      ids,
    );

    await this.sigModel.deleteMany({ id: { $in: deletableIds } });
    return sigs;
  }

  private async updateSignature(update: Signature, old: SignatureDocument): Promise<Signature> {
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
      const updatedSig = await this.sigModel.findOneAndUpdate({ id: update.id }, update, {
        returnDocument: "after",
      });
      await this.wormholeService.syncReverseWormhole(updatedSig);
    }

    return this.sigModel.findOneAndUpdate({ id: update.id }, update, { returnDocument: "after" });
  }
}
