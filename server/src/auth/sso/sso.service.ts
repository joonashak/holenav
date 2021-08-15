import { Injectable } from "@nestjs/common";
import axios from "axios";

const callbackUrl = process.env.SSO_CALLBACK_URL;
const clientId = process.env.SSO_CLIENT_ID;
const secretKey = process.env.SSO_SECRET_KEY;

@Injectable()
export class SsoService {
  /**
   * Generate EVE SSO login page URL.
   */
  getClientLoginUrl() {
    const loginUrl = `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${callbackUrl}&client_id=${clientId}&state=asdasd`;
    return encodeURI(loginUrl);
  }

  /**
   * Get access and refresh tokens from EVE SSO server.
   */
  async getTokens(authorizationCode: string) {
    const res = await axios.post(
      "https://login.eveonline.com/v2/oauth/token",
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
    const { data } = await axios.get("https://login.eveonline.com/oauth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
}
