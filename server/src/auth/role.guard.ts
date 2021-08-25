import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import Roles from "../role/roles.enum";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";

/**
 * Guard to require *at least* a certain role for access. Use with the custom
 * `@RequiredRoles(role: Roles)` decorator, otherwise admin role will be
 * required.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { accesstoken } = gqlContext.getContext().req.headers;
    const { uid }: any = this.jwtService.decode(accesstoken);
    const user = await this.userService.findByIdWithTokens(uid);

    return this.checkToken(user, accesstoken) && this.checkRole(user, context);
  }

  checkToken(user: User, token: string): boolean {
    const { tokens } = user;
    return tokens.includes(token);
  }

  checkRole(user: User, context: ExecutionContext): boolean {
    const requiredRole =
      this.reflector.get<Roles>("requiredRole", context.getHandler()) || Roles.ADMIN;

    const { roles } = user;
    const roleLevels = roles.map(({ role }) => role);
    const maxRole = Math.max(...roleLevels);

    return maxRole >= requiredRole;
  }
}
