import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { RequiredRole } from "../../auth/requiredRoles.decorator";
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

  @RequiredRole(Roles.ADMIN)
  @Query((returns) => System)
  async getSystemByName(@Args("name") name: string) {
    return this.systemService.getByName(name);
  }
}
