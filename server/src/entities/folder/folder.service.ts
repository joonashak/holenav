import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import systemData from "@eve-data/systems";
import { Folder, FolderDocument } from "./folder.model";
import { SystemService } from "../system/system.service";
import { devToolsEnabled } from "../../config";
import { UserDocument } from "../../user/user.model";

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

  /**
   * Get `Folder`s that `user` has any roles for.
   * @param user Usually current user.
   * @returns List of `Folder`s.
   */
  async getAccessibleFolders(user: UserDocument): Promise<Folder[]> {
    const folderIds = user.folderRoles
      .filter(({ role }) => role)
      .map(({ folder }) => mongoose.Types.ObjectId(folder as unknown as string));
    return this.folderModel.find({ _id: { $in: folderIds } });
  }
}
