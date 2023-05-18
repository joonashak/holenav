import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import RequireAuth from "../auth/decorators/auth.decorator";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import AddFolderRoleInput from "./dto/add-folder-role.dto";
import AssignSystemRoleInput from "./dto/assign-system-role.dto";
import { SanitizedUserForManager } from "./dto/sanitized-user-for-manager.dto";
import { SanitizedUserForSelf } from "./dto/sanitized-user-for-self.dto";
import { SanitizedUser } from "./dto/sanitized-user.dto";
import SystemRole from "./roles/system-role.enum";
import { UserSettingsService } from "./settings/user-settings.service";
import { UserRoleService } from "./user-role.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private userSettingsService: UserSettingsService,
  ) {}

  @RequireAuth()
  @Query((returns) => SanitizedUserForSelf)
  async whoami(@CurrentUser() user: SanitizedUserForSelf) {
    // ^ The name is all lowercase intentionally.. ;)
    // Don't return the decorator's User object to avoid leaking sensitive data.
    const acualUser = await this.userService.findById(user.id);
    return acualUser;
  }

  @RequireAuth()
  @Mutation((returns) => User)
  async updateSelectedMap(
    @Args("selectedMapId") selectedMapId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userSettingsService.updateSelectedMap(selectedMapId, user);
  }

  @RequireAuth()
  @Mutation((returns) => User)
  async addSavedMap(
    @Args("name") name: string,
    @Args("rootSystemName") rootSystemName: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userSettingsService.createSavedMap(name, rootSystemName, user);
  }

  @RequireAuth()
  @Mutation((returns) => User)
  async deleteSavedMap(@Args("mapId") mapId: string, @CurrentUser() user: User): Promise<User> {
    return this.userSettingsService.deleteSavedMap(mapId, user);
  }

  @RequireAuth()
  @Mutation((returns) => User)
  async removeAlt(@Args("esiId") esiId: string, @CurrentUser() user: User): Promise<User> {
    await this.userService.removeAlt(esiId, user.id);
    return this.whoami(user);
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Query((returns) => [SanitizedUserForManager])
  async getAllUsersForManager(): Promise<SanitizedUserForManager[]> {
    return this.userService.findAllUsersSanitizedForManager();
  }

  @RequireSystemRole(SystemRole.MANAGER)
  @Mutation((returns) => SanitizedUser)
  async addFolderRole(@Args("input") input: AddFolderRoleInput): Promise<User> {
    const { userEsiId, folderId, role } = input;
    return this.userService.addFolderRoleByEsiId(userEsiId, folderId, role);
  }

  @RequireAuth()
  @Mutation((returns) => SanitizedUser)
  async changeActiveFolder(
    @Args("folderId") folderId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userSettingsService.changeActiveFolder(folderId, user);
  }

  @RequireSystemRole(SystemRole.ADMINISTRATOR)
  @Mutation((returns) => SanitizedUserForManager)
  async assignSystemRole(
    @Args("input") input: AssignSystemRoleInput,
  ): Promise<SanitizedUserForManager> {
    return this.userRoleService.assignSystemRole(input.userId, input.systemRole);
  }
}
