import { RequireAuthentication } from "@joonashak/nestjs-clone-bay";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireFolderAccess } from "../../access-control/folder/require-folder-access.decorator";
import { SystemMutationService } from "../signature/neo/system-mutation.service";
import { System } from "./system.model";

@Resolver()
@RequireAuthentication()
export class SystemResolver {
  constructor(private systemService: SystemMutationService) {}

  @RequireFolderAccess(FolderAction.Read)
  @Query(() => System, { nullable: true })
  async getSystemByName(
    @Args("name") name: string,
    @Args("folderId") folderId: string,
  ) {
    return this.systemService.findSystem(name, folderId);
  }
}
