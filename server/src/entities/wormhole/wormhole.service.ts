import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ForbiddenError, UserInputError } from "apollo-server-express";
import { Model } from "mongoose";
import { Folder } from "../folder/folder.model";
import { SignatureService } from "../signature/signature.service";
import { WormholeInput } from "./dto/add-wormhole.dto";
import UpdateWormholeInput from "./dto/update-wormhole.dto";
import { Wormhole, WormholeDocument } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(
    @InjectModel(Wormhole.name) private whModel: Model<Wormhole>,
    @Inject(forwardRef(() => SignatureService)) private signatureService: SignatureService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Wormhole[]> {
    return this.whModel.find({ systemName, folder }).populate("reverse");
  }

  async createWormholes(wormholes: WormholeInput[], folder: Folder): Promise<Wormhole[]> {
    const wormholesWithTypes = this.addTypesToWormholes(wormholes);
    const wormholesToCreate = wormholesWithTypes.map((wh) => ({ ...wh, folder }));
    const newWormholes = await this.whModel.create(wormholesToCreate);
    const wormholesWithReverses = await this.addReverseWormholes(newWormholes);
    return wormholesWithReverses;
  }

  async updateWormhole(
    id: string,
    folder: Folder,
    update: Partial<UpdateWormholeInput>,
  ): Promise<Wormhole> {
    const oldWh = await this.whModel.findOne({ id, folder });
    if (!oldWh) {
      throw new ForbiddenError("User has no access to requested wormhole.");
    }

    const [validType, validReverseType] = this.getValidWormholeTypes(
      update.type,
      update.reverseType,
    );

    const updatedWh = await this.whModel.findOneAndUpdate(
      { id },
      { ...update, type: validType, reverseType: validReverseType },
      { returnDocument: "after" },
    );

    // Destination added.
    if (!oldWh.destinationName && update.destinationName) {
      return this.addReverseWormhole(updatedWh);
    }

    // Destination removed.
    if (oldWh.destinationName && update.destinationName === null) {
      return this.removeReverseWormhole(updatedWh);
    }

    // Destination updated.
    if (oldWh.destinationName && update.destinationName) {
      await this.updateReverseWormhole(updatedWh, validReverseType);
    }

    return this.whModel.findById(updatedWh._id).populate("reverse");
  }

  async deleteWormhole(id: string): Promise<Wormhole> {
    const removed = await this.whModel.findOneAndDelete({ id }, { returnDocument: "before" });
    const { reverse } = removed;

    if (reverse) {
      await this.whModel.findByIdAndDelete(reverse);
    }

    return removed;
  }

  private async addReverseWormhole(wormhole: WormholeDocument): Promise<WormholeDocument> {
    const { systemName, destinationName, folder, eol, massStatus, type } = wormhole;

    const reverse = await this.whModel.create({
      name: "",
      systemName: destinationName,
      destinationName: systemName,
      reverse: wormhole,
      type: wormhole.reverseType,
      reverseType: type,
      eol,
      massStatus,
      folder,
    });

    return this.whModel
      .findByIdAndUpdate(wormhole._id, { reverse }, { returnDocument: "after" })
      .populate("reverse");
  }

  private async addReverseWormholes(wormholes: WormholeDocument[]): Promise<Wormhole[]> {
    const updatedWormholes = wormholes.map(async (wh) => {
      if (!wh.destinationName) {
        return wh;
      }
      return this.addReverseWormhole(wh);
    });

    return Promise.all(updatedWormholes);
  }

  private async updateReverseWormhole(
    wormhole: WormholeDocument,
    reverseType: string,
  ): Promise<void> {
    const { destinationName, eol, massStatus, reverse, type } = wormhole;

    await this.whModel.findByIdAndUpdate(reverse, {
      systemName: destinationName,
      type: reverseType,
      reverseType: type,
      eol,
      massStatus,
    });
  }

  private async removeReverseWormhole(wormhole: WormholeDocument): Promise<WormholeDocument> {
    await this.whModel.findByIdAndDelete(wormhole.reverse);
    return this.whModel
      .findByIdAndUpdate(wormhole._id, { reverse: null }, { returnDocument: "after" })
      .populate("reverse");
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

  private addTypesToWormholes(wormholes: WormholeInput[]): WormholeInput[] {
    const wormholesWithTypes = wormholes.map((wh) => {
      const [type, reverseType] = this.getValidWormholeTypes(wh.type, wh.reverseType);
      return { ...wh, type, reverseType };
    });

    return wormholesWithTypes;
  }
}
