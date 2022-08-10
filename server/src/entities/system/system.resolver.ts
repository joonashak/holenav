import { Args, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { FolderDocument } from "../folder/folder.model";
import { System } from "./system.model";
import { SystemService } from "./system.service";

@Resolver((of) => System)
export class SystemResolver {
  constructor(private systemService: SystemService) {}

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => System)
  async getSystemByName(@Args("name") name: string, @ActiveFolder() activeFolder: FolderDocument) {
    const res = await this.systemService.getByName(name, activeFolder);
    return res;
  }
}
