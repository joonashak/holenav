import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FolderService } from "../folder/folder.service";
import { SystemService } from "../system/system.service";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connectionTree.dto";
import { Wormhole } from "./wormhole.model";

@Injectable()
export class WormholeService {
  constructor(
    @InjectModel(Wormhole.name) private whModel: Model<Wormhole>,
    private folderService: FolderService,
    private systemService: SystemService,
  ) {}

  async getConnectionTree(rootSystemName: string, folderId: string): Promise<ConnectionTree> {
    console.time("Wormhole graphlookup");
    const folder = await this.folderService.getFolderById(folderId);

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

  async getBySystem(systemName: string, folderId: string): Promise<Wormhole[]> {
    const folder = await this.folderService.getFolderById(folderId);
    return this.whModel.find({ systemName, folder });
  }
}
