import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import RequireAuth from "../auth/decorators/auth.decorator";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import AssignSystemRoleInput from "./dto/assign-system-role.dto";
import { SanitizedUserForManager } from "./dto/sanitized-user-for-manager.dto";
import { SanitizedUser } from "./dto/sanitized-user.dto";
import { UserSsoTokens } from "./dto/user-sso-tokens.dto";
import SystemRole from "./roles/system-role.enum";
import { UserSettingsService } from "./settings/user-settings.service";
import { UserRoleService } from "./user-role.service";
import { HolenavUser } from "./user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private userSettingsService: UserSettingsService,
  ) {}

  @RequireAuth()
  @Query((returns) => HolenavUser)
  async whoami(@CurrentUser() user: HolenavUser) {
    // ^ The name is all lowercase intentionally.. ;)
    // Don't return the decorator's User object to avoid leaking sensitive data.
    const acualUser = await this.userService.findById(user.id);
    return acualUser;
  }

  @RequireAuth()
  @Mutation((returns) => HolenavUser)
  async updateSelectedMap(
    @Args("selectedMapId") selectedMapId: string,
    @CurrentUser() user: HolenavUser,
  ): Promise<HolenavUser> {
    return this.userSettingsService.updateSelectedMap(selectedMapId, user);
  }

  @RequireAuth()
  @Mutation((returns) => HolenavUser)
  async addSavedMap(
    @Args("name") name: string,
    @Args("rootSystemName") rootSystemName: string,
    @CurrentUser() user: HolenavUser,
  ): Promise<HolenavUser> {
    return this.userSettingsService.createSavedMap(name, rootSystemName, user);
  }

  @RequireAuth()
  @Mutation((returns) => HolenavUser)
  async deleteSavedMap(
    @Args("mapId") mapId: string,
    @CurrentUser() user: HolenavUser,
  ): Promise<HolenavUser> {
    return this.userSettingsService.deleteSavedMap(mapId, user);
  }

  @RequireAuth()
  @Mutation((returns) => HolenavUser)
  async removeAlt(
    @Args("esiId") esiId: string,
    @CurrentUser() user: HolenavUser,
  ): Promise<HolenavUser> {
    await this.userService.removeAlt(esiId, user.id);
    return this.whoami(user);
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Query((returns) => [SanitizedUserForManager])
  async getAllUsersForManager(): Promise<SanitizedUserForManager[]> {
    return this.userService.findUsersSanitizedForManager();
  }

  @RequireAuth()
  @Mutation((returns) => SanitizedUser)
  async changeActiveFolder(
    @Args("folderId") folderId: string,
    @CurrentUser() user: HolenavUser,
  ): Promise<HolenavUser> {
    return this.userSettingsService.changeActiveFolder(folderId, user);
  }

  @RequireSystemRole(SystemRole.ADMINISTRATOR)
  @Mutation((returns) => SanitizedUserForManager)
  async assignSystemRole(
    @Args("input") input: AssignSystemRoleInput,
  ): Promise<SanitizedUserForManager> {
    await this.userRoleService.assignSystemRole(input.userId, input.systemRole);
    const users = await this.userService.findUsersSanitizedForManager({
      id: input.userId,
    });
    return users[0];
  }

  @RequireSystemRole(SystemRole.USER)
  @Query((returns) => UserSsoTokens)
  async getSsoTokens(@CurrentUser() user: HolenavUser): Promise<UserSsoTokens> {
    return this.userService.getSsoTokens(user);
  }
}
