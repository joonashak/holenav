import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserInputError } from "apollo-server-express";
import { Model } from "mongoose";
import SigType from "../enums/sig-type.enum";
import { Signature, SignatureDocument } from "../signature.model";

@Injectable()
export class WormholeService {
  constructor(@InjectModel(Signature.name) private sigModel: Model<SignatureDocument>) {}

  /**
   * Check that given wormhole types are valid and fill the other side with
   * K162 if possible. Throws upon invalid type input.
   * @returns An array of length 2 containing the valid types in respective order.
   */
  getValidWormholeTypes(wormholeType: string, reverseType: string): Array<string> {
    // TODO: Validate type against system class.
    if (!wormholeType && !reverseType) {
      return [null, null];
    }

    if (wormholeType === reverseType) {
      throw new UserInputError("Wormhole cannot have the same type on both sides.");
    }

    if (wormholeType === "K162" || reverseType === "K162") {
      return [wormholeType, reverseType];
    }

    return wormholeType ? [wormholeType, "K162"] : ["K162", reverseType];
  }

  addWhTypes<T extends { type: SigType; wormholeType?: string; reverseType?: string }>(
    sig: T,
  ): T & { wormholeType: string; reverseType: string } {
    if (sig.type !== SigType.WORMHOLE) {
      return { ...sig, wormholeType: null, reverseType: null };
    }

    const [wormholeType, reverseType] = this.getValidWormholeTypes(
      sig.wormholeType,
      sig.reverseType,
    );
    return { ...sig, wormholeType, reverseType };
  }

  /**
   * Add a new reverse wormhole sig based on the given Signature. Also takes care of updating
   * the reference to the given Signature.
   */
  async addReverseWormhole(signature: SignatureDocument): Promise<SignatureDocument> {
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

  async addReverseWormholes(signatures: SignatureDocument[]): Promise<Signature[]> {
    return Promise.all(signatures.map((sig) => this.addReverseWormhole(sig)));
  }

  syncReverseWormhole(update: SignatureDocument): Promise<SignatureDocument> {
    const { destinationName, systemName, reverseType, wormholeType, eol, massStatus, reverse } =
      update;

    const reverseWhUpdate = {
      systemName: destinationName,
      destinationName: systemName,
      wormholeType: reverseType,
      reverseType: wormholeType,
      eol,
      massStatus,
    };

    return this.sigModel
      .findByIdAndUpdate(reverse, reverseWhUpdate, { returnDocument: "after" })
      .exec();
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
      eveId: "",
      systemName: destinationName || "",
      destinationName: systemName,
      wormholeType: reverseType,
      reverseType: wormholeType,
      eol,
      massStatus,
      folder,
    };
  }
}
