import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { FolderRoleService } from "../../access-control/folder/folder-role/folder-role.service";
import { FolderAccessControl } from "../../access-control/folder/folder.access-control";
import { Folder, FolderDocument } from "./folder.model";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>,
    private folderAccessControl: FolderAccessControl,
    private folderRoleService: FolderRoleService,
  ) {}

  async createFolder(folder: Partial<FolderDocument>): Promise<Folder> {
    return this.folderModel.create(folder);
  }

  /**
   * Create new folder and give the creator admin rights to it.
   *
   * @param name Folder name.
   * @param user Creator of the folder.
   * @returns The created folder.
   */
  async createFolderAndPermissions(
    name: string,
    userId: string,
  ): Promise<Folder> {
    const folder = await this.createFolder({ name });
    await this.folderRoleService.create({
      action: FolderAction.Manage,
      folderId: folder.id,
      userId,
    });
    return folder;
  }

  async getFolderById(id: string): Promise<FolderDocument> {
    const folder = await this.folderModel.findOne({ id });
    if (!folder) {
      throw new NotFoundException();
    }
    return folder;
  }

  async findFoldersByAllowedAction(
    userId: string,
    action: FolderAction,
  ): Promise<Folder[]> {
    const authorizedFolderIds =
      await this.folderAccessControl.authorizedFolders(userId, action);
    return this.folderModel.find({ id: { $in: authorizedFolderIds } });
  }
}
