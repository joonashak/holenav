import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService) {}

  /**
   * Handle callback after player has successfully logged in through EVE SSO.
   */
  @Get("callback")
  async callback(
    @Query("code") authorizationCode: string,
    @Query("state") state: string,
    @Res() response: Response,
  ) {
    const clientCallbackUrl = await this.ssoService.handleCallback(authorizationCode, state);
    response.redirect(clientCallbackUrl);
  }
}
