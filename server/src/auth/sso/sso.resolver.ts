import { Query, Resolver } from "@nestjs/graphql";
import { User } from "../../user/user.model";
import RequireAuth from "../decorators/auth.decorator";
import { CurrentUser } from "../decorators/user.decorator";
import StartSsoLoginDto from "../dto/startSsoLogin.dto";
import { SsoService } from "./sso.service";
import SsoSessionTypes from "./ssoSession/ssoSessionTypes.enum";

@Resolver()
export default class SsoResolver {
  constructor(private ssoService: SsoService) {}

  /**
   * Start the EVE SSO authentication flow to login or sign up.
   */
  @Query((returns) => StartSsoLoginDto)
  async startSsoLogin(): Promise<StartSsoLoginDto> {
    const ssoLoginUrl = await this.ssoService.getSsoLoginUrl(SsoSessionTypes.LOGIN);
    return { ssoLoginUrl };
  }

  /**
   * Start the EVE SSO authentication flow to add a new character to and existing
   * account.
   */
  @RequireAuth()
  @Query((returns) => StartSsoLoginDto)
  async addCharacter(@CurrentUser() user: User): Promise<StartSsoLoginDto> {
    const ssoLoginUrl = await this.ssoService.getSsoLoginUrl(SsoSessionTypes.ADD_CHARACTER, user);
    return { ssoLoginUrl };
  }
}