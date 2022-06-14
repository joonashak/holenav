import { Injectable } from "@nestjs/common";
import axios from "axios";
import FormData from "form-data";
import { SSO_CLIENT_ID, SSO_SECRET_KEY } from "../../config";
import { SsoUrl } from "./sso-url.enum";

@Injectable()
export class SsoApiService {
  /**
   * Get access and refresh tokens from EVE SSO server.
   */
  async getSsoTokens(authorizationCode: string) {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", authorizationCode);

    const res = await axios.post(SsoUrl.Token, formData, {
      auth: { username: SSO_CLIENT_ID, password: SSO_SECRET_KEY },
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
  async verifyAndDecodeSsoAccessToken(token: string) {
    // Implicitly fails on non-200 status code.
    const { data } = await axios.get(SsoUrl.Verify, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
}
