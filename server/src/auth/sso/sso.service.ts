import { Injectable } from "@nestjs/common";
import { clientUrl, getClientLoginCallbackUrl, ssoCallbackUrl, ssoClientId } from "../../config";
import { CharacterService } from "../../entities/character/character.service";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import { SsoApiService } from "./ssoApi.service";
import { SsoSessionService } from "./ssoSession/ssoSession.service";
import SsoSessionTypes from "./ssoSession/ssoSessionTypes.enum";
import { SsoUrl } from "./ssoUrl.enum";

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
    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${ssoCallbackUrl}&client_id=${ssoClientId}&state=${key}`;
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
    });

    await this.ssoSessionService.setSsoLoginSuccess(state, character);

    if (ssoSession.type === SsoSessionTypes.ADD_CHARACTER) {
      await this.userService.addAlt(character, ssoSession.user.id);
      await this.ssoSessionService.removeSsoSession(ssoSession.key);
    }

    const clientCallbackUrl =
      ssoSession.type === SsoSessionTypes.LOGIN ? getClientLoginCallbackUrl(state) : clientUrl;

    return clientCallbackUrl;
  }
}
