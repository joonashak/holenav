import { Args, Query, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import Roles from "../../role/roles.enum";
import { System } from "./system.model";
import { SystemService } from "./system.service";

@Resolver((of) => System)
export class SystemResolver {
  constructor(private systemService: SystemService) {}

  @RequireFolderRole(Roles.READ)
  @Query((returns) => System)
  async getSystemByName(@Args("name") name: string, @Args("folderId") folderId: string) {
    return this.systemService.getByName(name);
  }
}
