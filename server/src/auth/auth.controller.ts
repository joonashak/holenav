import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService) {}

  /**
   * Redirect client to EVE SSO login page.
   */
  @Get("login")
  login(@Res() response: Response) {
    const ssoLoginUrl = this.ssoService.getClientLoginUrl();
    response.redirect(ssoLoginUrl);
  }

  /**
   * Callback path for getting the authorization code after player auth with EVE SSO.
   */
  @Get("callback")
  async callback(
    @Query("code") authorizationCode: string,
    @Res() response: Response,
  ) {
    // TODO: Check state parameter.
    const tokens = await this.ssoService.getTokens(authorizationCode);
    console.log(tokens);

    return response.send("OK");
  }
}
