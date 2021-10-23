import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Folder, FolderDocument } from "../folder/folder.model";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connectionTree.dto";
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
    return this.whModel.find({ systemName, folder });
  }

  async createWormhole(data: Wormhole): Promise<Wormhole> {
    let wormhole = await this.whModel.create(data);
    const { destinationName } = wormhole;

    if (destinationName) {
      wormhole = await this.addReverseWormhole(wormhole);
    }

    return wormhole;
  }

  async updateWormhole(id: string, folder: Folder, update: Partial<Wormhole>): Promise<Wormhole> {
    const oldWh = await this.whModel.findOne({ id, folder });
    const updatedWh = await this.whModel.findOneAndUpdate({ id }, update, {
      returnDocument: "after",
    });

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
      await this.updateReverseWormhole(updatedWh);
    }

    return updatedWh;
  }

  private async addReverseWormhole(wormhole: WormholeDocument): Promise<WormholeDocument> {
    const { systemName, destinationName, folder, type, eol, massStatus } = wormhole;
    const reverseType = type !== "K162" && type ? "K162" : null;

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

    return this.whModel.findByIdAndUpdate(wormhole._id, { reverse }, { returnDocument: "after" });
  }

  private async updateReverseWormhole(wormhole: WormholeDocument): Promise<void> {
    const { destinationName, type, eol, massStatus, reverse } = wormhole;
    const reverseType = type !== "K162" && !type ? "K162" : null;

    await this.whModel.findByIdAndUpdate(reverse, {
      systemName: destinationName,
      type: reverseType,
      eol,
      massStatus,
    });
  }

  private async removeReverseWormhole(wormhole: WormholeDocument): Promise<WormholeDocument> {
    await this.whModel.findByIdAndDelete(wormhole.reverse);
    return this.whModel.findByIdAndUpdate(
      wormhole._id,
      { reverse: null },
      { returnDocument: "after" },
    );
  }
}
