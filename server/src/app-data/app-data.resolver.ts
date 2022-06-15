import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import SystemRoles from "../user/roles/system-roles.enum";
import { AppData } from "./app-data.model";
import { AppDataService } from "./app-data.service";
import { PublicAppData } from "./dto/public-app-data.dto";

@Resolver()
export class AppDataResolver {
  constructor(private appDataService: AppDataService) {}

  @Query((returns) => PublicAppData)
  async getPublicAppData(): Promise<PublicAppData> {
    return this.appDataService.getAppData();
  }

  @RequireSystemRole(SystemRoles.ADMINISTRATOR)
  @Mutation((returns) => AppData)
  async updateMotd(@Args("name") motd: string) {
    return this.appDataService.updateAppData({ motd });
  }
}
