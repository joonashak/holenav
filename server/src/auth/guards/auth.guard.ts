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
import checkToken from "./checkToken";

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
      user = await checkToken(request, this.jwtService, this.userService);
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
