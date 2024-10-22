import { RequireAuthentication, UserId } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { Folder } from "./folder.model";
import { FolderService } from "./folder.service";

@Resolver()
export class FolderResolver {
  constructor(private folderService: FolderService) {}

  @RequireAuthentication()
  @Query(() => [Folder])
  async findAccessibleFolders(@UserId() userId: string) {
    return this.folderService.findFoldersByAllowedAction(
      userId,
      FolderAction.Read,
    );
  }

  @RequireAuthentication()
  @Query(() => [Folder])
  async findManageableFolders(@UserId() userId: string) {
    return this.folderService.findFoldersByAllowedAction(
      userId,
      FolderAction.Manage,
    );
  }

  @RequireAuthentication()
  @Mutation(() => Folder)
  async createFolder(
    @Args("name") name: string,
    @UserId() userId: string,
  ): Promise<Folder> {
    return this.folderService.createFolderAndPermissions(name, userId);
  }
}
