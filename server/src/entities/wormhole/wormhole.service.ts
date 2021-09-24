import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Wormhole } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(@InjectModel(Wormhole.name) private whModel: Model<Wormhole>) {}

  async getConnectionTree(rootId: string) {
    console.time("asd");

    const res = await this.whModel.aggregate([
      { $match: { system: Types.ObjectId(rootId) } },
      {
        $graphLookup: {
          from: "wormholes",
          startWith: "$destination",
          connectFromField: "destination",
          connectToField: "system",
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
