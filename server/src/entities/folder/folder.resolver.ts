import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../../auth/decorators/role.decorator";
import { CurrentUser } from "../../auth/decorators/user.decorator";
import SystemRoles from "../../user/roles/system-roles.enum";
import { UserDocument } from "../../user/user.model";
import { Folder } from "./folder.model";
import { FolderService } from "./folder.service";

@Resolver()
export class FolderResolver {
  constructor(private folderService: FolderService) {}

  @RequireSystemRole(SystemRoles.USER)
  @Query((type) => [Folder])
  async getAccessibleFolders(@CurrentUser() user: UserDocument) {
    return this.folderService.getAccessibleFolders(user);
  }

  @RequireSystemRole(SystemRoles.MANAGER)
  @Query((type) => [Folder])
  async getManageableFolders(@CurrentUser() user: UserDocument) {
    return this.folderService.getManageableFolders(user);
  }

  @RequireSystemRole(SystemRoles.MANAGER)
  @Mutation((type) => Folder)
  async createFolder(
    @Args("name") name: string,
    @CurrentUser() user: UserDocument,
  ): Promise<Folder> {
    return this.folderService.createFolderAndPermissions(name, user);
  }
}
