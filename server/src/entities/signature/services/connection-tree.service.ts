import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FolderDocument } from "../../folder/folder.model";
import { ConnectionTree, ConnectionTreeNode } from "../dto/connection-tree.dto";
import { Signature } from "../signature.model";

@Injectable()
export class ConnectionTreeService {
  constructor(@InjectModel(Signature.name) private sigModel: Model<Signature>) {}

  async getConnectionTree(rootSystemName: string, folder: FolderDocument): Promise<ConnectionTree> {
    console.time("Wormhole graphlookup");

    const res = await this.sigModel.aggregate([
      { $match: { systemName: rootSystemName, folder: Types.ObjectId(folder._id) } },
      {
        $graphLookup: {
          from: "wormholes",
          startWith: "$destinationName",
          connectFromField: "destinationName",
          connectToField: "systemName",
          as: "children",
          depthField: "n",
          restrictSearchWithMatch: { folder: Types.ObjectId(folder._id) },
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
    const allChildren = this.findAllChildren(res);
    const children = this.findChildren(allChildren, rootSystemName);
    console.timeEnd("Construct map tree");

    return {
      rootSystemName,
      children,
    };
  }

  /**
   * Find all children in the graphLookup result.
   * Accounts for the shape of the Mongo result. Specifically, it includes all child nodes in
   * every top-level result object if that top-level object has children. Thus we want to get
   * the children of only one top-level result, and only the top-level results, if none of them
   * have children.
   * @param aggregateResult Result from mongo's `$graphLookup` operation.
   */
  private findAllChildren(aggregateResult: any[]): Signature[] {
    const allChildren = aggregateResult.find((res) => res.children.length);

    if (!allChildren) {
      return aggregateResult;
    }

    return allChildren.children;
  }

  private findChildren(
    allChildren: Signature[],
    system: string,
    parentName = "",
  ): ConnectionTreeNode[] {
    const rootChildren = allChildren
      .filter((child) => child.systemName === system && child.destinationName !== parentName)
      .map((wormhole) => {
        const { name, destinationName } = wormhole;
        return {
          name,
          wormhole,
          children: this.findChildren(allChildren, destinationName, system),
        };
      });

    return rootChildren;
  }
}
