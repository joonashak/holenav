import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../auth/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import AssignSystemRoleInput from "./dto/assign-system-role.dto";
import { SanitizedUserForManager } from "./dto/sanitized-user-for-manager.dto";
import { UserSsoTokens } from "./dto/user-sso-tokens.dto";
import SystemRole from "./roles/system-role.enum";
import { UserRoleService } from "./user-role.service";
import { HolenavUser } from "./user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {}

  @RequireSystemRole(SystemRole.MANAGER)
  @Query((returns) => [SanitizedUserForManager])
  async getAllUsersForManager(): Promise<SanitizedUserForManager[]> {
    return this.userService.findUsersSanitizedForManager();
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
