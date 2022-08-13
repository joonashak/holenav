import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserInputError } from "apollo-server-express";
import { Model } from "mongoose";
import { Folder } from "../folder/folder.model";
import SigType from "./sig-type.enum";
import { Signature, SignatureDocument } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(@InjectModel(Signature.name) private sigModel: Model<SignatureDocument>) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.sigModel.find({ systemName, folder }).populate("reverse");
  }

  async createSignatures(signatures: Signature[]): Promise<Signature[]> {
    const sigsWithWhTypes = signatures.map(this.addWhTypes);
    const newSigs = await this.sigModel.create(sigsWithWhTypes);
    const sigsWithReverses = await this.addReverseWormholes(newSigs);
    return sigsWithReverses;
  }

  // FIXME:
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

  // FIXME:
  async deleteSignature(id: string): Promise<Signature> {
    // FIXME: Remove reverse wormholes.
    return this.sigModel.findOneAndDelete({ id });
  }

  // FIXME:
  async deleteManySignaturesByEveId(
    eveIds: string[],
    systemName: string,
    folder: Folder,
  ): Promise<Signature[]> {
    // FIXME: Remove reverse wormholes.
    const filter = {
      $and: [{ eveId: { $in: eveIds } }, { systemName }, { folder }],
    };

    const deleted = await this.sigModel.find(filter);
    await this.sigModel.deleteMany(filter);
    return deleted;
  }

  // FIXME:
  private async updateSignature(update: Signature, old: SignatureDocument): Promise<Signature> {
    // TODO: Refactor: signature utils isWormhole()
    // sig -> wh: add rev if exists
    if (old.type !== SigType.WORMHOLE && update.type === SigType.WORMHOLE) {
      const sigWithWhTypes = this.addWhTypes(update);
      const updatedSig = await this.sigModel.findOneAndUpdate(
        { id: sigWithWhTypes.id },
        sigWithWhTypes,
        {
          returnDocument: "after",
        },
      );
      return this.addReverseWormhole(updatedSig);
    }

    // wh -> sig: remove rev if exists
    if (old.type === SigType.WORMHOLE && update.type !== SigType.WORMHOLE && old.reverse) {
      await this.sigModel.findByIdAndDelete(old.reverse);
      return this.sigModel.findOneAndUpdate(
        { id: update.id },
        { ...update, reverse: null },
        { returnDocument: "after" },
      );
    }
    // wh -> wh: update rev if exists
    if (old.type === SigType.WORMHOLE && update.type === SigType.WORMHOLE) {
      // ARE THE FIRST TWO THE SAME CASES AS THE ABOVE TWO???
      // ACUALLY JUST CREATE REVERSE OBJECT ALWAYS AND JUST SYNC IT.
      // rev n -> rev y: add rev
      // rev y -> rev n: del rev
      // rev y -> rev y: sync
    }

    return this.sigModel.findOneAndUpdate({ id: update.id }, update, { returnDocument: "after" });
  }

  /**
   * Check that given wormhole types are valid and fill the other side with
   * K162 if possible. Throws upon invalid type input.
   * @returns An array of length 2 containing the valid types in respective order.
   */
  private getValidWormholeTypes(type: string, reverseType: string): Array<string> {
    // TODO: Validate type against system class.
    if (!type && !reverseType) {
      return [null, null];
    }

    if (type === reverseType) {
      throw new UserInputError("Wormhole cannot have the same type on both sides.");
    }

    if (type === "K162" || reverseType === "K162") {
      return [type, reverseType];
    }

    return type ? [type, "K162"] : ["K162", reverseType];
  }

  private addWhTypes(sig: Signature): Signature {
    if (sig.type !== SigType.WORMHOLE) {
      return sig;
    }

    const [wormholeType, reverseType] = this.getValidWormholeTypes(sig.type, sig.reverseType);
    return { ...sig, wormholeType, reverseType };
  }

  /**
   * Add a new reverse wormhole sig based on the given Signature. Also takes care of updating
   * the reference to the given Signature.
   */
  private async addReverseWormhole(signature: SignatureDocument): Promise<SignatureDocument> {
    if (signature.type !== SigType.WORMHOLE) {
      return signature;
    }

    const reverse = await this.sigModel.create({
      ...this.flipWormhole(signature),
      reverse: signature,
    });

    return this.sigModel
      .findByIdAndUpdate(signature._id, { reverse }, { returnDocument: "after" })
      .populate("reverse");
  }

  private async addReverseWormholes(signatures: SignatureDocument[]): Promise<Signature[]> {
    return Promise.all(signatures.map(this.addReverseWormhole));
  }

  /**
   * Create reverse wormhole based on the given Signature.
   */
  private flipWormhole({
    systemName,
    destinationName,
    folder,
    eol,
    massStatus,
    wormholeType,
    reverseType,
  }: Signature): Signature {
    return {
      type: SigType.WORMHOLE,
      name: "",
      systemName: destinationName,
      destinationName: systemName,
      wormholeType: reverseType,
      reverseType: wormholeType,
      eol,
      massStatus,
      folder,
    };
  }
}
