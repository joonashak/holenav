import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { FolderRole } from "../../auth/role.decorator";
import { RoleGuard } from "../../auth/role.guard";
import Roles from "../../role/roles.enum";
import { System } from "./system.model";
import { SystemService } from "./system.service";

@UseGuards(RoleGuard)
@Resolver((of) => System)
export class SystemResolver {
  constructor(private systemService: SystemService) {}

  @Query((returns) => [System])
  async systems() {
    return this.systemService.list();
  }

  @FolderRole({ role: Roles.READ, key: "folderId" })
  @Query((returns) => System)
  async getSystemByName(@Args("name") name: string, @Args("folderId") folderId: string) {
    return this.systemService.getByName(name);
  }
}
