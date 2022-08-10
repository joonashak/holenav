import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../../auth/decorators/role.decorator";
import { CurrentUser } from "../../auth/decorators/user.decorator";
import SystemRole from "../../user/roles/system-role.enum";
import { UserDocument } from "../../user/user.model";
import { Folder } from "./folder.model";
import { FolderService } from "./folder.service";

@Resolver()
export class FolderResolver {
  constructor(private folderService: FolderService) {}

  @RequireSystemRole(SystemRole.USER)
  @Query((type) => [Folder])
  async getAccessibleFolders(@CurrentUser() user: UserDocument) {
    return this.folderService.getAccessibleFolders(user);
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Query((type) => [Folder])
  async getManageableFolders(@CurrentUser() user: UserDocument) {
    return this.folderService.getManageableFolders(user);
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Mutation((type) => Folder)
  async createFolder(
    @Args("name") name: string,
    @CurrentUser() user: UserDocument,
  ): Promise<Folder> {
    return this.folderService.createFolderAndPermissions(name, user);
  }
}
