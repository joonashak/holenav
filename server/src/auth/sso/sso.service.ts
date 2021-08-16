import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";
import { SsoState, SsoStateDocument } from "./ssoState.model";
import { SsoUrl } from "./ssoUrl.enum";

const callbackUrl = process.env.SSO_CALLBACK_URL;
const clientId = process.env.SSO_CLIENT_ID;
const secretKey = process.env.SSO_SECRET_KEY;

@Injectable()
export class SsoService {
  constructor(@InjectModel(SsoState.name) private ssoStateModel: Model<SsoStateDocument>) {}

  /**
   * Generate EVE SSO login page URL.
   */
  async getClientLoginUrl() {
    const state = await this.ssoStateModel.create({
      value: uuid(),
      expiry: dayjs().add(5, "minute"),
    });

    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${callbackUrl}&client_id=${clientId}&state=${state.value}`;
    return encodeURI(loginUrl);
  }

  /**
   * Get access and refresh tokens from EVE SSO server.
   */
  async getTokens(authorizationCode: string) {
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

  async verifySsoState(userState: string) {
    // Remove state right away so we never have to worry about it being used twice.
    const { expiry } = await this.ssoStateModel.findOneAndRemove({ value: userState });

    if (dayjs().isAfter(expiry)) {
      throw new Error("SSO state expired.");
    }
  }
}
