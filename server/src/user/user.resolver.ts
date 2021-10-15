import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { User } from "./user.model";
import { UserService } from "./user.service";
import RequireAuth from "../auth/decorators/auth.decorator";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @RequireAuth()
  @Query((returns) => User)
  async whoami(@CurrentUser() user: User) {
    // ^ The name is all lowercase intentionally.. ;)
    // Don't use the decorator's User object to avoid leaking sensitive data.
    const acualUser = await this.userService.findById(user.id);
    return acualUser;
  }

  @RequireAuth()
  @Mutation((returns) => User)
  async updateSelectedMap(
    @Args("selectedMapId") selectedMapId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    const { settings } = await this.userService.findById(user.id);
    const selectedMap = settings.maps.find((map) => map.id === selectedMapId) || null;
    const updatedUser = await this.userService.updateUserSettings(user.id, { selectedMap });
    return updatedUser;
  }
}
