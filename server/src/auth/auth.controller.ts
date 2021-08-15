import { Controller, Get, Res } from "@nestjs/common";
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
}
