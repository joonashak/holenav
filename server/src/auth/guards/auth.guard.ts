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
import users from "../../devTools/data/users";
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
      user.tokens = null;
      request.user = user;
    }

    return authorized;
  }

  private async getUser(headers: any) {
    const allowedMockUsers = users.map((user) => user.id);
    const mocking =
      devToolsEnabled && !!headers.mockuser && allowedMockUsers.includes(headers.mockuser);
    let uid: string;

    if (mocking) {
      uid = headers.mockuser;
    } else {
      const decoded: any = this.jwtService.decode(headers.accesstoken);
      uid = decoded.uid;
    }

    const user = await this.userService.findByIdWithTokens(uid);

    if (!user.tokens.includes(headers.accesstoken)) {
      throw new HttpException("Authentication failed.", HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
