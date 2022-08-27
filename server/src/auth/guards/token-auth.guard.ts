import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { AuthenticationError } from "apollo-server-express";
import { ENABLE_DEVTOOLS, NOT_PRODUCTION } from "../../config";
import mockUsers from "../../dev-tools/data/users";
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
    const request = this.getRequest(context);
    const accessToken = request.headers.accesstoken || null;

    if (!accessToken) {
      throw new AuthenticationError("Access token was not provided.");
    }

    if (this.usingMockUser(accessToken)) {
      request.user = await this.userService.findById(accessToken);
      return true;
    }

    const { sessionId } = this.authService.verifyToken(accessToken);
    const session = await this.sessionService.verifySession(sessionId);
    const { user } = session;

    if (!user) {
      throw new AuthenticationError("Unknown authentication error.");
    }

    request.user = user;
    request.session = session;
    return true;
  }

  private usingMockUser(accessToken: string): boolean {
    const mockUserIds = mockUsers.map((user) => user.id);
    return NOT_PRODUCTION && ENABLE_DEVTOOLS && mockUserIds.includes(accessToken);
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === "http") {
      return context.switchToHttp().getRequest();
    }

    if (context.getType<GqlContextType>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }

    throw new BadRequestException("Server only accepts HTTP and GraphQL requests.");
  }
}
