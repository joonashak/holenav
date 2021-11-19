import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { devToolsEnabled } from "../../config";
import mockUsers from "../../devTools/data/users";
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
    const request = gqlContext.getContext().req || context.switchToHttp().getRequest();
    let user: User;

    try {
      const accessToken = request.headers.accesstoken || null;
      user = await this.getUser(request.headers);

      if (!devToolsEnabled && !user.tokens.includes(accessToken)) {
        throw true;
      }
    } catch {
      throw new HttpException("Authentication failed.", HttpStatus.FORBIDDEN);
    }

    const authorized = !!user;

    // Add user data to request only after authorization to avoid mistakes.
    if (authorized) {
      // DO NOT REMOVE THIS!
      // Fetch the user again in a service if you really need to see the tokens.
      user.tokens = null;
      request.user = user;
    }

    return authorized;
  }

  private async getUser(headers: any) {
    const allowedMockUsers = mockUsers.map((user) => user.id);
    const { accesstoken } = headers;

    const mocking = devToolsEnabled && allowedMockUsers.includes(headers.accesstoken);
    const uid = mocking ? accesstoken : this.jwtService.decode(headers.accesstoken)["uid"];

    const user = await this.userService.findByIdWithTokens(uid);

    if (!mocking && !user.tokens.includes(headers.accesstoken)) {
      throw new HttpException("Authentication failed.", HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
