import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Folder, FolderDocument } from "../folder/folder.model";
import AddWormholeInput from "./dto/addWormhole.dto";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connectionTree.dto";
import UpdateWormholeInput from "./dto/updateWormhole.dto";
import { Wormhole, WormholeDocument } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(@InjectModel(Wormhole.name) private whModel: Model<Wormhole>) {}

  async getConnectionTree(rootSystemName: string, folder: FolderDocument): Promise<ConnectionTree> {
    console.time("Wormhole graphlookup");

    const res = await this.whModel.aggregate([
      { $match: { systemName: rootSystemName, folder: Types.ObjectId(folder._id) } },
      // Children are flattened so no need to do the recursive search for more than one wh.
      { $limit: 1 },
      {
        $graphLookup: {
          from: "wormholes",
          startWith: "$destinationName",
          connectFromField: "destinationName",
          connectToField: "systemName",
          as: "children",
          depthField: "n",
        },
      },
    ]);

    console.timeEnd("Wormhole graphlookup");

    if (!res.length) {
      return {
        rootSystemName,
        children: [],
      };
    }

    console.time("Construct map tree");
    const { children } = res[0];
    const rootChildren = this.findChildren(children, rootSystemName);

    console.timeEnd("Construct map tree");

    return {
      rootSystemName,
      children: rootChildren,
    };
  }

  private findChildren(
    allChildren: Wormhole[],
    systemName: string,
    parentName = "",
  ): ConnectionTreeNode[] {
    const rootChildren = allChildren
      .filter((child) => child.systemName === systemName && child.destinationName !== parentName)
      .map(({ name, destinationName, systemName }) => {
        return {
          name,
          children: this.findChildren(allChildren, destinationName, systemName),
        };
      });

    return rootChildren;
  }

  async getBySystem(systemName: string, folder: Folder): Promise<Wormhole[]> {
    return this.whModel.find({ systemName, folder }).populate("reverse");
  }

  async createWormhole(data: AddWormholeInput, folder: Folder): Promise<Wormhole> {
    const [type, reverseType] = this.getValidWormholeTypes(data.type, data.reverseType);
    let wormhole = await this.whModel.create({ ...data, type, folder });
    const { destinationName } = wormhole;

    if (destinationName) {
      wormhole = await this.addReverseWormhole(wormhole, reverseType);
    }

    return wormhole;
  }

  async updateWormhole(
    id: string,
    folder: Folder,
    update: Partial<UpdateWormholeInput>,
  ): Promise<Wormhole> {
    const oldWh = await this.whModel.findOne({ id, folder });
    if (!oldWh) {
      throw new HttpException("User has no access to requested wormhole.", HttpStatus.FORBIDDEN);
    }

    const [validType, validReverseType] = this.getValidWormholeTypes(
      update.type,
      update.reverseType,
    );

    const updatedWh = await this.whModel.findOneAndUpdate(
      { id },
      { ...update, type: validType },
      { returnDocument: "after" },
    );

    // Destination added.
    if (!oldWh.destinationName && update.destinationName) {
      return this.addReverseWormhole(updatedWh, validReverseType);
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

  private async addReverseWormhole(
    wormhole: WormholeDocument,
    reverseType: string,
  ): Promise<WormholeDocument> {
    const { systemName, destinationName, folder, eol, massStatus } = wormhole;

    const reverse = await this.whModel.create({
      name: "rev from " + systemName,
      systemName: destinationName,
      destinationName: systemName,
      reverse: wormhole,
      type: reverseType,
      eol,
      massStatus,
      folder,
    });

    return this.whModel
      .findByIdAndUpdate(wormhole._id, { reverse }, { returnDocument: "after" })
      .populate("reverse");
  }

  private async updateReverseWormhole(
    wormhole: WormholeDocument,
    reverseType: string,
  ): Promise<void> {
    const { destinationName, eol, massStatus, reverse } = wormhole;

    await this.whModel.findByIdAndUpdate(reverse, {
      systemName: destinationName,
      type: reverseType,
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
      throw new HttpException(
        "Wormhole cannot have the same type on both sides.",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type === "K162" || reverseType === "K162") {
      return [type, reverseType];
    }

    return type ? [type, "K162"] : ["K162", reverseType];
  }
}
