import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderAction } from "./folder-action.enum";
import { FolderRoleService } from "./folder-role.service";

@Injectable()
export class FolderAccessControl {
  constructor(
    private folderAbilityFactory: FolderAbilityFactory,
    private folderRoleService: FolderRoleService,
    private userService: CloneBayUserService,
  ) {}

  async canRead(userId: string, folderId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    const roles = await this.folderRoleService.findRoles(user, folderId);
    const ability = this.folderAbilityFactory.createForUser(user);

    if (ability.cannot(FolderAction.Read, user)) {
      throw new ForbiddenException();
    }
  }
}
