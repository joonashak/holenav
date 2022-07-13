import { Model } from "mongoose";
import { FolderService } from "../../entities/folder/folder.service";
import MassStatus from "../../entities/wormhole/mass-status.enum";
import { Wormhole } from "../../entities/wormhole/wormhole.model";
import { WormholeService } from "../../entities/wormhole/wormhole.service";
import whMockData from "../data/wormholes";

export default async (
  whModel: Model<Wormhole>,
  whService: WormholeService,
  folderService: FolderService,
) => {
  await whModel.deleteMany({});
  const folder = await folderService.getDefaultFolder();

  const wormholesToCreate = whMockData.map((wh) => ({
    eveId: "",
    eol: false,
    massStatus: MassStatus.STABLE,
    type: "",
    reverseType: "",
    ...wh,
  }));

  await whService.createWormholes(wormholesToCreate, folder);
};
