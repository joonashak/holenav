import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Folder, FolderDocument } from "./folder.model";
import { UserDocument } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import FolderRole from "../../user/roles/folder-role.enum";
import SystemRole from "../../user/roles/system-role.enum";

const defaultFolderName = "Default Folder";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async createFolder(folder: Partial<FolderDocument>): Promise<Folder> {
    return this.folderModel.create(folder);
  }

  /**
   * Create new folder and give the creator admin rights to it.
   * @param name Folder name.
   * @param user Creator of the folder.
   * @returns The created folder.
   */
  async createFolderAndPermissions(name: string, user: UserDocument): Promise<Folder> {
    const folder = await this.createFolder({ name });
    await this.userService.addFolderRole(user, { folder, role: FolderRole.ADMIN });
    return folder;
  }

  async getDefaultFolder(): Promise<Folder> {
    return this.folderModel.findOne({ name: defaultFolderName });
  }

  async getFolderById(id: string): Promise<FolderDocument> {
    return this.folderModel.findOne({ id });
  }

  private async getFolderByRole(user: UserDocument, minRole: FolderRole): Promise<Folder[]> {
    if (user.systemRole === SystemRole.ADMINISTRATOR) {
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
    return this.getFolderByRole(user, FolderRole.READ);
  }

  /**
   * Get `Folder`s that `user` can manage.
   *
   * Returns all folders for system admins.
   * @param user Usually current user.
   * @returns List of `Folder`s.
   */
  async getManageableFolders(user: UserDocument): Promise<Folder[]> {
    return this.getFolderByRole(user, FolderRole.MANAGE);
  }
}
