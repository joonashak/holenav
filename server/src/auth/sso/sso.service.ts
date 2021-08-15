import { Injectable } from "@nestjs/common";

@Injectable()
export class SsoService {
  getClientLoginUrl() {
    const callbackUrl = process.env.SSO_CALLBACK_URL;
    const clientId = process.env.SSO_CLIENT_ID;

    const loginUrl = `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${callbackUrl}&client_id=${clientId}&state=asdasd`;
    return encodeURI(loginUrl);
  }
}
