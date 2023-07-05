import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../../auth/decorators/role.decorator";
import SystemRole from "../../user/roles/system-role.enum";
import { AppData } from "../app-data.model";
import { AppSettingsService } from "./app-settings.service";

@Resolver()
export class AppSettingsResolver {
  constructor(private appSettingsService: AppSettingsService) {}

  @RequireSystemRole(SystemRole.ADMINISTRATOR)
  @Mutation((returns) => AppData)
  async addAllowedCorporation(@Args("esiId") esiId: string): Promise<AppData> {
    return this.appSettingsService.addAllowedCorporation(esiId);
  }
}
