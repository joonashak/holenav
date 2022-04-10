import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserDocument } from "../user/user.model";
import { AuthService } from "./auth.service";
import RequireAuth from "./decorators/auth.decorator";
import { CurrentUser } from "./decorators/user.decorator";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService, private authService: AuthService) {}

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

  // FIXME: Remove.
  @RequireAuth()
  @Get("logout")
  async logout(@Req() request: Request, @CurrentUser() user: UserDocument) {
    const { headers } = request;
    const { accesstoken } = headers;

    await this.authService.endSession(accesstoken as string, user);
    return "OK";
  }
}
