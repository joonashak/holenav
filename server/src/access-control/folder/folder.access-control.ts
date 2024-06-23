import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { Folder } from "../../entities/folder/folder.model";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderAction } from "./folder-role/folder-action.enum";
import { FolderRoleService } from "./folder-role/folder-role.service";

@Injectable()
export class FolderAccessControl {
  constructor(
    private folderAbilityFactory: FolderAbilityFactory,
    private folderRoleService: FolderRoleService,
    private userService: CloneBayUserService,
  ) {}

  async authorize(
    userId: string,
    folderId: string,
    action: FolderAction,
  ): Promise<boolean> {
    const user = await this.userService.findById(userId);
    const roles = await this.folderRoleService.findRoles(folderId);
    const ability = this.folderAbilityFactory.createForUser(user, roles);

    return ability.can(action, Folder);
  }
}