import { Injectable } from "@nestjs/common";
import axios from "axios";
import FormData from "form-data";
import { ssoCallbackUrl, ssoClientId, ssoSecretKey } from "../../config";
import { CharacterService } from "../../entities/character/character.service";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import { SsoSessionService } from "./ssoSession/ssoSession.service";
import SsoSessionTypes from "./ssoSession/ssoSessionTypes.enum";
import { SsoUrl } from "./ssoUrl.enum";

@Injectable()
export class SsoService {
  constructor(
    private ssoSessionService: SsoSessionService,
    private characterService: CharacterService,
    private userService: UserService,
  ) {}

  /**
   * Generate EVE SSO login page URL.
   */
  async getSsoLoginUrl(type: SsoSessionTypes, user: User = null) {
    const { key } = await this.ssoSessionService.createSsoSession(type, user);
    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${ssoCallbackUrl}&client_id=${ssoClientId}&state=${key}`;
    return encodeURI(loginUrl);
  }

  /**
   * Get access and refresh tokens from EVE SSO server.
   */
  async getSsoTokens(authorizationCode: string) {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", authorizationCode);

    const res = await axios.post(SsoUrl.Token, formData, {
      auth: { username: ssoClientId, password: ssoSecretKey },
      headers: { "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}` },
    });

    const { data } = res;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  /**
   * Verify JWT token through EVE SSO.
   *
   * Returns character data if the token is valid.
   */
  async verifyAndDecodeToken(token: string) {
    // Implicitly fails on non-200 status code.
    const { data } = await axios.get(SsoUrl.Verify, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }

  /**
   * Get the SSO tokens using the authorization code supplied by the user, save
   * them and update the SSO state with the character's ID.
   */
  async handleCallback(authorizationCode: string, state: string) {
    const session = await this.ssoSessionService.verifySsoSession(state);

    const { accessToken, refreshToken } = await this.getSsoTokens(authorizationCode);
    const jwtData = await this.verifyAndDecodeToken(accessToken);

    const character = await this.characterService.upsert({
      name: jwtData.CharacterName,
      esiId: jwtData.CharacterID,
      accessToken,
      refreshToken,
    });

    await this.ssoSessionService.setSsoLoginSuccess(state, character);

    if (session.type === SsoSessionTypes.ADD_CHARACTER) {
      await this.userService.addAlt(character, session.user.id);
    }
  }
}
