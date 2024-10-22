import { RequireAuthentication, UserId } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderService } from "../../entities/folder/folder.service";
import { UserPreferences } from "./user-preferences.model";
import { UserPreferencesService } from "./user-preferences.service";

@Resolver()
export class UserPreferencesResolver {
  constructor(
    private userPreferencesService: UserPreferencesService,
    private folderService: FolderService,
  ) {}

  @RequireAuthentication()
  @Query(() => UserPreferences)
  async getMyUserPreferences(@UserId() userId: string) {
    return this.userPreferencesService.findByUserId(userId);
  }

  @RequireAuthentication()
  @Mutation(() => UserPreferences)
  async updateActiveFolder(
    @Args("folderId") folderId: string,
    @UserId() userId: string,
  ): Promise<UserPreferences> {
    const activeFolder = await this.folderService.getFolderById(folderId);
    return this.userPreferencesService.update(userId, { activeFolder });
  }
}
