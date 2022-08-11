import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserInputError } from "apollo-server-express";
import { Model } from "mongoose";
import { Folder } from "../folder/folder.model";
import UpdateSignatureInput from "./dto/update-signature.dto";
import SigType from "./sig-type.enum";
import { Signature, SignatureDocument } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(@InjectModel(Signature.name) private sigModel: Model<SignatureDocument>) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.sigModel.find({ systemName, folder }).populate("reverse");
  }

  async createSignatures(signatures: Signature[]): Promise<Signature[]> {
    const sigsWithWhTypes = this.addTypesToWormholes(signatures);
    const newSigs = await this.sigModel.create(sigsWithWhTypes);
    const sigsWithReverses = await this.addReverseWormholes(newSigs);
    return sigsWithReverses;
  }

  // FIXME:
  async updateSignature(id: string, update: Partial<UpdateSignatureInput>): Promise<Signature> {
    // FIXME: Remove reverse wormholes.
    return this.sigModel.findOneAndUpdate({ id }, update, { returnDocument: "after" });
  }

  // FIXME:
  async updateSignatures(sigUpdates: UpdateSignatureInput[]): Promise<Signature[]> {
    return Promise.all(
      sigUpdates.map(async ({ id, ...update }) => this.updateSignature(id, update)),
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

  /**
   * Check that given wormhole types are valid and fill the other side with
   * K162 if possible. Throws upon invalid type input.
   * @returns An array of length 2 containing the valid types in respective order.
   */
  private getValidWormholeTypes(type: string, reverseType: string): Array<string> {
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

  private addTypesToWormholes(signatures: Signature[]): Signature[] {
    const sigsWithWhTypes = signatures.map((sig) => {
      if (sig.type !== SigType.WORMHOLE) {
        return sig;
      }

      const [wormholeType, reverseType] = this.getValidWormholeTypes(sig.type, sig.reverseType);
      return { ...sig, wormholeType, reverseType };
    });

    return sigsWithWhTypes;
  }

  private async addReverseWormhole(signature: SignatureDocument): Promise<SignatureDocument> {
    const { systemName, destinationName, folder, eol, massStatus, wormholeType } = signature;

    const reverse = await this.sigModel.create({
      type: SigType.WORMHOLE,
      name: "",
      systemName: destinationName,
      destinationName: systemName,
      reverse: signature,
      wormholeType: signature.reverseType,
      reverseType: wormholeType,
      eol,
      massStatus,
      folder,
    });

    return this.sigModel
      .findByIdAndUpdate(signature._id, { reverse }, { returnDocument: "after" })
      .populate("reverse");
  }

  private async addReverseWormholes(signatures: SignatureDocument[]): Promise<Signature[]> {
    const updatedSigs = signatures.map(async (sig) => {
      if (sig.type !== SigType.WORMHOLE || !sig.destinationName) {
        return sig;
      }
      return this.addReverseWormhole(sig);
    });

    return Promise.all(updatedSigs);
  }
}
