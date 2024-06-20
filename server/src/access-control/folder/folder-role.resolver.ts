import { UserId } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateFolderRoleDto } from "./dto/create-folder-role";
import { FolderRole } from "./folder-role.model";
import { FolderRoleService } from "./folder-role.service";

@Resolver()
export class FolderRoleResolver {
  constructor(private folderRoleService: FolderRoleService) {}

  @Mutation(() => FolderRole)
  async createFolderRole(
    @UserId() userId: string,
    @Args("role") role: CreateFolderRoleDto,
  ) {
    // TODO: Check access (:
    await this.folderRoleService.create(
      role.userId,
      role.folderId,
      role.action,
    );
  }
}
