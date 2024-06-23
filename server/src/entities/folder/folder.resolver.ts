import { UserId } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireSystemRole } from "../../auth/decorators/role.decorator";
import SystemRole from "../../user/roles/system-role.enum";
import { Folder } from "./folder.model";
import { FolderService } from "./folder.service";

@Resolver()
export class FolderResolver {
  constructor(private folderService: FolderService) {}

  @RequireSystemRole(SystemRole.USER)
  @Query(() => [Folder])
  async getAccessibleFolders(@UserId() userId: string) {
    return this.folderService.findFoldersByAllowedAction(
      userId,
      FolderAction.Read,
    );
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Query(() => [Folder])
  async getManageableFolders(@UserId() userId: string) {
    return this.folderService.findFoldersByAllowedAction(
      userId,
      FolderAction.Manage,
    );
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Mutation(() => Folder)
  async createFolder(
    @Args("name") name: string,
    @UserId() userId: string,
  ): Promise<Folder> {
    return this.folderService.createFolderAndPermissions(name, userId);
  }
}
