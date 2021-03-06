import { Injectable } from "@nestjs/common";
import {
  CLIENT_URL,
  getClientLoginCallbackUrl,
  SSO_CALLBACK_URL,
  SSO_CLIENT_ID,
} from "../../config";
import { CharacterService } from "../../entities/character/character.service";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import { SsoApiService } from "./sso-api.service";
import { SsoSessionService } from "./sso-session/sso-session.service";
import SsoSessionTypes from "./sso-session/sso-session-types.enum";
import { SsoUrl } from "./sso-url.enum";

@Injectable()
export class SsoService {
  constructor(
    private ssoSessionService: SsoSessionService,
    private characterService: CharacterService,
    private userService: UserService,
    private ssoApiService: SsoApiService,
  ) {}

  /**
   * Generate EVE SSO login page URL.
   */
  async getSsoLoginUrl(user: User = null) {
    const { key } = await this.ssoSessionService.createSsoSession(user);
    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${SSO_CALLBACK_URL}&client_id=${SSO_CLIENT_ID}&state=${key}`;
    return encodeURI(loginUrl);
  }

  /**
   * Get the SSO tokens using the authorization code supplied by the user, save
   * them and update the SSO state with the character's ID.
   *
   * @returns URL to redirect the client to.
   */
  async handleCallback(authorizationCode: string, state: string): Promise<string> {
    const ssoSession = await this.ssoSessionService.verifySsoSession(state);

    const { accessToken, refreshToken } = await this.ssoApiService.getSsoTokens(authorizationCode);
    const jwtData = await this.ssoApiService.verifyAndDecodeSsoAccessToken(accessToken);

    const character = await this.characterService.upsert({
      name: jwtData.CharacterName,
      esiId: jwtData.CharacterID,
      accessToken,
      refreshToken,
      isMain: false,
    });

    await this.ssoSessionService.setSsoLoginSuccess(state, character);

    if (ssoSession.type === SsoSessionTypes.ADD_CHARACTER) {
      await this.userService.addAlt(character, ssoSession.user.id);
      await this.ssoSessionService.removeSsoSession(ssoSession.key);
    }

    const clientCallbackUrl =
      ssoSession.type === SsoSessionTypes.LOGIN ? getClientLoginCallbackUrl(state) : CLIENT_URL;

    return clientCallbackUrl;
  }
}
