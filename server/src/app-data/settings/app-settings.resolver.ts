import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AppData } from "../app-data.model";
import { AppSettingsService } from "./app-settings.service";

@Resolver()
export class AppSettingsResolver {
  constructor(private appSettingsService: AppSettingsService) {}

  @Mutation(() => AppData)
  async addAllowedCorporation(@Args("esiId") esiId: string): Promise<AppData> {
    return this.appSettingsService.addAllowedCorporation(esiId);
  }

  @Mutation(() => AppData)
  async addAllowedAlliance(@Args("esiId") esiId: string): Promise<AppData> {
    return this.appSettingsService.addAllowedAlliance(esiId);
  }

  @Mutation(() => AppData)
  async removeAllowedCorporation(
    @Args("esiId") esiId: string,
  ): Promise<AppData> {
    return this.appSettingsService.removeAllowedCorporation(esiId);
  }

  @Mutation(() => AppData)
  async removeAllowedAlliance(@Args("esiId") esiId: string): Promise<AppData> {
    return this.appSettingsService.removeAllowedAlliance(esiId);
  }
}
