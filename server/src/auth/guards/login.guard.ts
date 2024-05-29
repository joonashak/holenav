import { AuthenticationError } from "@nestjs/apollo";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "../auth.service";

/**
 * Require valid credentials to allow activation.
 *
 * GraphQL args must include strings `username` and `password`.
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { username, password } = gqlContext.getArgs();
    const user = await this.authService.validateUserCredentials(
      username,
      password,
    );

    if (!user) {
      throw new AuthenticationError("Login failed on invalid credentials.");
    }

    const request = gqlContext.getContext().req;
    request.user = user;

    return true;
  }
}
