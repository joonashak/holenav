import { UserId } from "@joonashak/nestjs-clone-bay";
import { Query, Resolver } from "@nestjs/graphql";
import { UserPreferences } from "./user-preferences.model";
import { UserPreferencesService } from "./user-preferences.service";

@Resolver()
export class UserPreferencesResolver {
  constructor(private userPreferencesService: UserPreferencesService) {}

  @Query(() => UserPreferences)
  async getMyUserPreferences(@UserId() userId: string) {
    return this.userPreferencesService.findByUserId(userId);
  }
}
