import { Model } from "mongoose";
import { FolderService } from "../entities/folder/folder.service";
import { Wormhole } from "../entities/wormhole/wormhole.model";
import whMockData from "./data/wormholes";

export default async (whModel: Model<Wormhole>, folderService: FolderService) => {
  await whModel.deleteMany({});
  const folder = await folderService.getDefaultFolder();

  for (const wh of whMockData) {
    await whModel.create({ ...wh, folder });
  }
};
