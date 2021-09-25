import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wormhole } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(@InjectModel(Wormhole.name) private whModel: Model<Wormhole>) {}

  async getConnectionTree(rootSystemName: string) {
    console.time("Wormhole graphlookup");

    // FIXME: Add folder to $match.
    const res = await this.whModel.aggregate([
      { $match: { systemName: rootSystemName } },
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
    console.time("Construct map tree");

    const { children, ...system } = res[0];
    const rootChildren = this.findChildren(children, rootSystemName);

    console.timeEnd("Construct map tree");

    return {};
  }

  findChildren(allChildren: Wormhole[], systemName: string, parentName = ""): any[] {
    const directChildren = allChildren
      .filter((child) => child.systemName === systemName && child.destinationName !== parentName)
      .map((child) => {
        return {
          ...child,
          children: this.findChildren(allChildren, child.destinationName, child.systemName),
        };
      });
    return directChildren;
  }
}
