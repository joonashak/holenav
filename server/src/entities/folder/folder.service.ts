import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import systemData from "@eve-data/systems";
import { Folder, FolderDocument } from "./folder.model";
import { SystemService } from "../system/system.service";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    private systemService: SystemService,
  ) {}

  async getDefaultFolder(): Promise<Folder> {
    return this.folderModel.findOne({ name: "Default Folder" });
  }

  /**
   * Create new folder and populate it with star systems.
   * @param name Folder name.
   * @returns The created folder.
   */
  async createFolder(name: string): Promise<Folder> {
    const folder = await this.folderModel.create({ name });
    const newSystems = systemData.map(({ name }) => ({ name, folder }));
    await this.systemService.bulkSave(newSystems);
    return folder;
  }
}
