import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { groupBy } from "lodash";
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
    // TODO: Refactor to `User`?
    userId: string,
    folderId: string,
    action: FolderAction,
  ): Promise<boolean> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = await this.folderRoleService.findRoles(folderId);
    const ability = this.folderAbilityFactory.createForUser(user, roles);

    return ability.can(action, Folder);
  }

  /**
   * Folders user is allowed to take given action on.
   *
   * Returns folder ID's.
   */
  async authorizedFolders(
    userId: string,
    action: FolderAction,
  ): Promise<string[]> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = await this.folderRoleService.findRolesForUser(user);
    const rolesByFolder = groupBy(roles, "folderId");

    const authorizedFolderIds = Object.keys(rolesByFolder).filter(
      (folderId) => {
        const ability = this.folderAbilityFactory.createForUser(
          user,
          rolesByFolder[folderId],
        );
        return ability.can(action, Folder);
      },
    );

    return authorizedFolderIds;
  }
}
