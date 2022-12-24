import { Args, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { FolderDocument } from "../folder/folder.model";
import { SystemMutationService } from "../signature/neo/system-mutation.service";
import { System } from "./system.model";

@Resolver((of) => System)
export class SystemResolver {
  constructor(private systemService: SystemMutationService) {}

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => System, { nullable: true })
  async getSystemByName(@Args("name") name: string, @ActiveFolder() activeFolder: FolderDocument) {
    const res = await this.systemService.findSystem(name, activeFolder.id);
    return res;
  }
}
