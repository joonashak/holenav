import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wormhole } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(@InjectModel(Wormhole.name) private whModel: Model<Wormhole>) {}

  async getConnectionTree(rootSystemName: string) {
    console.time("asd");

    // FIXME: Add folder to $match.
    const res = await this.whModel.aggregate([
      { $match: { systemName: rootSystemName } },
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

    const { children, ...system } = res[0];

    // TODO: Make tree.

    console.timeEnd("asd");
    return {};
  }
}
