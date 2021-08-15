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

  @Get("callback")
  callback(
    @Query("code") authorizationCode: string,
    @Res() response: Response,
  ) {
    // TODO: Check state parameter.
    console.log(authorizationCode);

    return response.send("OK");
  }
}
