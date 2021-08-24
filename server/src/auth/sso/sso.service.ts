import { Injectable } from "@nestjs/common";
import axios from "axios";
import { CharacterService } from "src/entities/character/character.service";
import { SsoStateService } from "./ssoState/ssoState.service";
import { SsoUrl } from "./ssoUrl.enum";

const callbackUrl = process.env.SSO_CALLBACK_URL;
const clientId = process.env.SSO_CLIENT_ID;
const secretKey = process.env.SSO_SECRET_KEY;

@Injectable()
export class SsoService {
  constructor(
    private ssoStateService: SsoStateService,
    private characterService: CharacterService,
  ) {}

  /**
   * Generate EVE SSO login page URL.
   */
  async getClientLoginUrl() {
    const state = await this.ssoStateService.getSsoState();

    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${callbackUrl}&client_id=${clientId}&state=${state}`;
    return encodeURI(loginUrl);
  }

  /**
   * Get access and refresh tokens from EVE SSO server.
   */
  async getSsoTokens(authorizationCode: string) {
    const res = await axios.post(
      SsoUrl.Token,
      { grant_type: "authorization_code", code: authorizationCode },
      { auth: { username: clientId, password: secretKey } },
    );

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
    await this.ssoStateService.verifySsoState(state);

    const { accessToken, refreshToken } = await this.getSsoTokens(authorizationCode);

    const jwtData = await this.verifyAndDecodeToken(accessToken);

    const character = await this.characterService.upsert({
      name: jwtData.CharacterName,
      esiId: jwtData.CharacterID,
      accessToken,
      refreshToken,
    });

    await this.ssoStateService.setSsoLoginSuccess(state, character);
  }
}
