import { UserId } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateFolderRoleDto } from "./dto/create-folder-role.dto";
import { FolderAction } from "./folder-action.enum";
import { FolderRole } from "./folder-role.model";
import { FolderRoleService } from "./folder-role.service";
import { FolderAccessControl } from "./folder.access-control";

@Resolver()
export class FolderRoleResolver {
  constructor(
    private folderRoleService: FolderRoleService,
    private folderAccessControl: FolderAccessControl,
  ) {}

  @Mutation(() => FolderRole)
  async createFolderRole(
    @UserId() userId: string,
    @Args("role") role: CreateFolderRoleDto,
  ): Promise<FolderRole> {
    await this.folderAccessControl.authorize(
      userId,
      role.folderId,
      FolderAction.Manage,
    );
    return this.folderRoleService.create(role);
  }
}
