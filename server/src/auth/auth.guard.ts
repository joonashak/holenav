import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";

/**
 * Guard to require *at least* a certain role for access. Use with custom
 * `@SystemRole` or `@FolderRole` decorator to specify what role is required,
 * otherwise this guard defaults to admin role.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const { accesstoken } = request.headers;
    const { uid }: any = this.jwtService.decode(accesstoken);
    console.log(uid);
    const user = await this.userService.findByIdWithTokens(uid);

    const authorized = this.checkToken(user, accesstoken);

    // Add user data to request only after authorization to avoid mistakes.
    if (authorized) {
      user.tokens = null;
      request.user = user;
    }

    return authorized;
  }

  checkToken(user: User, token: string): boolean {
    const { tokens } = user;
    return tokens.includes(token);
  }
}
