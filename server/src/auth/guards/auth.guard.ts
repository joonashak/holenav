import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";

/**
 * Guard to require only token authentication.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    let user: User;

    try {
      const accessToken = request.headers.accesstoken;
      const { uid }: any = this.jwtService.decode(accessToken);
      user = await this.userService.findByIdWithTokens(uid);

      if (!user.tokens.includes(accessToken)) {
        throw true;
      }
    } catch {
      throw new HttpException("Authentication failed.", HttpStatus.FORBIDDEN);
    }

    const authorized = !!user;

    // Add user data to request only after authorization to avoid mistakes.
    if (authorized) {
      user.tokens = null;
      request.user = user;
    }

    return authorized;
  }
}
