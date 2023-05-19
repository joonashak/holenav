import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import SystemRole from "../user/roles/system-role.enum";
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

  @RequireSystemRole(SystemRole.ADMINISTRATOR)
  @Query((returns) => AppData)
  async getAppData(): Promise<AppData> {
    return this.appDataService.getAppData();
  }

  @RequireSystemRole(SystemRole.ADMINISTRATOR)
  @Mutation((returns) => AppData)
  async updateMotd(@Args("motd") motd: string): Promise<AppData> {
    return this.appDataService.updateAppData({ motd });
  }
}
