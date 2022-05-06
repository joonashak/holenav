import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { User } from "./user.model";
import { UserService } from "./user.service";
import RequireAuth from "../auth/decorators/auth.decorator";
import { UserSettingsService } from "./settings/userSettings.service";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import SystemRoles from "./roles/systemRoles.enum";
import { SanitizedUser } from "./dto/sanitizedUser.dto";
import AddFolderRoleInput from "./dto/addFolderRole.dto";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService, private userSettingsService: UserSettingsService) {}

  @RequireAuth()
  @Query((returns) => User)
  async whoami(@CurrentUser() user: User) {
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

  @RequireSystemRole(SystemRoles.MANAGER)
  @Query((returns) => [SanitizedUser])
  async getAllUsers(): Promise<SanitizedUser[]> {
    return this.userService.findAllUsersSanitized();
  }

  @RequireSystemRole(SystemRoles.MANAGER)
  @Mutation((returns) => SanitizedUser)
  async addFolderRole(@Args("input") input: AddFolderRoleInput): Promise<User> {
    const { userEsiId, folderId, role } = input;
    return this.userService.addFolderRoleByEsiId(userEsiId, folderId, role);
  }
}
