import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import systemData from "@eve-data/systems";
import { Folder, FolderDocument } from "./folder.model";
import { SystemService } from "../system/system.service";
import { devToolsEnabled } from "../../config";

const defaultFolderName = "Default Folder";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    private systemService: SystemService,
  ) {}

  private async createFolderWithOptionalId(name: string, id: string = null) {
    const folder = id
      ? await this.folderModel.create({ name, id })
      : await this.folderModel.create({ name });

    const newSystems = systemData.map(({ name }) => ({ name, folder }));
    await this.systemService.bulkSave(newSystems);
    return folder;
  }

  /**
   * Create new folder and populate it with star systems.
   * @param name Folder name.
   * @returns The created folder.
   */
  async createFolder(name: string): Promise<Folder> {
    return this.createFolderWithOptionalId(name);
  }

  async createDefaultFolder(): Promise<Folder> {
    if (devToolsEnabled) {
      return this.createFolderWithOptionalId(defaultFolderName, "default");
    }

    return this.createFolderWithOptionalId(defaultFolderName);
  }

  async getDefaultFolder(): Promise<Folder> {
    return this.folderModel.findOne({ name: defaultFolderName });
  }

  async getFolderById(id: string): Promise<FolderDocument> {
    return this.folderModel.findOne({ id });
  }
}
