import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AppData } from "./app-data.model";
import { AppDataService } from "./app-data.service";
import { AppDataUpdateDto } from "./dto/app-data-update.dto";
import { PublicAppData } from "./dto/public-app-data.dto";

@Resolver()
export class AppDataResolver {
  constructor(private appDataService: AppDataService) {}

  @Query((returns) => PublicAppData)
  async getPublicAppData(): Promise<PublicAppData> {
    return this.appDataService.getAppData();
  }

  @Query((returns) => AppData)
  async getAppData(): Promise<AppData> {
    return this.appDataService.getAppData();
  }

  @Mutation((returns) => AppData)
  async updateMotd(@Args("motd") motd: string): Promise<AppData> {
    return this.appDataService.updateAppData({ motd });
  }

  @Mutation((returns) => AppData)
  async updateAppData(
    @Args("input") input: AppDataUpdateDto,
  ): Promise<AppData> {
    return this.appDataService.updateAppData(input);
  }
}
