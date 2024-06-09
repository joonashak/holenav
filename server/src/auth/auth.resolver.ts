import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CurrentSession } from "./decorators/session.decorator";
import AccessTokenDto from "./dto/access-token.dto";
import LogoutDto from "./dto/logout.dto";
import { TokenAuthGuard } from "./guards/token-auth.guard";
import { Session } from "./session/session.model";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  /** Callback for client to get Holenav's auth token after successful SSO login. */
  @Mutation((returns) => AccessTokenDto)
  async getToken(@Args("state") state: string): Promise<AccessTokenDto> {
    const accessToken = await this.authService.validateSsoLogin(state);
    return { accessToken };
  }

  @UseGuards(TokenAuthGuard)
  @Mutation((returns) => LogoutDto)
  async logout(@CurrentSession() session: Session): Promise<LogoutDto> {
    await this.authService.logout(session);
    return { loggedOut: true };
  }
}
