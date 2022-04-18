import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthenticationError } from "apollo-server-express";
import { devToolsEnabled, notProduction } from "../../config";
import mockUsers from "../../devTools/data/users";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { SessionService } from "../session/session.service";

/**
 * Guard to require only token authentication.
 */
@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const accessToken = request.headers.accesstoken || null;

    if (!accessToken) {
      throw new AuthenticationError("Access token was not provided.");
    }

    if (this.usingMockUser(accessToken)) {
      request.user = await this.userService.findById(accessToken);
      return true;
    }

    const { sessionId } = this.authService.verifyToken(accessToken);
    const { user } = await this.sessionService.verifySession(sessionId);

    if (!user) {
      throw new AuthenticationError("Unknown authentication error.");
    }

    request.user = user;
    return true;
  }

  private usingMockUser(accessToken: string): boolean {
    const mockUserIds = mockUsers.map((user) => user.id);
    console.log("devToolsEnabled", devToolsEnabled);
    return notProduction && devToolsEnabled && mockUserIds.includes(accessToken);
  }
}
