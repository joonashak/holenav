import { Controller, Get, HttpException, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User, UserDocument } from "../user/user.model";
import { AuthService } from "./auth.service";
import RequireAuth from "./decorators/auth.decorator";
import { CurrentUser } from "./decorators/user.decorator";
import { SsoService } from "./sso/sso.service";
import SsoSessionTypes from "./sso/ssoSession/ssoSessionTypes.enum";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService, private authService: AuthService) {}

  // FIXME: Remove.
  /**
   * Redirect client to EVE SSO login page for logging in to Holenav.
   */
  @Get("login")
  async login(@Res() response: Response): Promise<void> {
    const ssoLoginUrl = await this.ssoService.getSsoLoginUrl(SsoSessionTypes.LOGIN);
    response.redirect(ssoLoginUrl);
  }

  // FIXME: Remove.
  /**
   * Redirect client to EVE SSO login page for adding a new character to existing user.
   */
  @RequireAuth()
  @Get("addCharacter")
  async addCharacter(@CurrentUser() user: User): Promise<string> {
    const ssoLoginUrl = await this.ssoService.getSsoLoginUrl(SsoSessionTypes.ADD_CHARACTER, user);
    return ssoLoginUrl;
  }

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
  /**
   * Check if an authentication token is still valid.
   */
  @Get("validateToken")
  async validateToken(@Req() request: Request) {
    const { headers } = request;
    const { accesstoken } = headers;

    if (!accesstoken || typeof accesstoken === "object") {
      throw new HttpException("Bad token format.", HttpStatus.BAD_REQUEST);
    }

    const valid = await this.authService.validateToken(accesstoken);
    if (!valid) {
      throw new HttpException("Token not valid.", HttpStatus.UNAUTHORIZED);
    }

    return "Token OK.";
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
