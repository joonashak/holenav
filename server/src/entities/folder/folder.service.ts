import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import systemData from "@eve-data/systems";
import { Folder, FolderDocument } from "./folder.model";
import { SystemService } from "../system/system.service";
import { devToolsEnabled } from "../../config";
import { UserDocument } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import FolderRoles from "../../user/roles/folderRoles.enum";
import SystemRoles from "../../user/roles/systemRoles.enum";

const defaultFolderName = "Default Folder";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    private systemService: SystemService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
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

  /**
   * Create new folder and give the creator admin rights to it.
   * @param name Folder name.
   * @param user Creator of the folder.
   * @returns The created folder.
   */
  async createFolderAndPermissions(name: string, user: UserDocument): Promise<Folder> {
    const folder = await this.createFolder(name);
    await this.userService.addFolderRole(user, { folder, role: FolderRoles.ADMIN });
    return folder;
  }

  async getDefaultFolder(): Promise<Folder> {
    return this.folderModel.findOne({ name: defaultFolderName });
  }

  async getFolderById(id: string): Promise<FolderDocument> {
    return this.folderModel.findOne({ id });
  }

  private async getFolderByRole(user: UserDocument, minRole: FolderRoles): Promise<Folder[]> {
    if (user.systemRole === SystemRoles.ADMINISTRATOR) {
      return this.folderModel.find({});
    }

    const folderIds = user.folderRoles
      .filter(({ role }) => role >= minRole)
      .map(({ folder }) => mongoose.Types.ObjectId(folder as unknown as string));
    return this.folderModel.find({ _id: { $in: folderIds } });
  }

  /**
   * Get `Folder`s that `user` has any roles for.
   *
   * Returns all folders for system admins.
   * @param user Usually current user.
   * @returns List of `Folder`s.
   */
  async getAccessibleFolders(user: UserDocument): Promise<Folder[]> {
    return this.getFolderByRole(user, FolderRoles.READ);
  }

  /**
   * Get `Folder`s that `user` can manage.
   *
   * Returns all folders for system admins.
   * @param user Usually current user.
   * @returns List of `Folder`s.
   */
  async getManageableFolders(user: UserDocument): Promise<Folder[]> {
    return this.getFolderByRole(user, FolderRoles.MANAGE);
  }
}
