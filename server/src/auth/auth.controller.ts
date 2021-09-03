import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { getClientLoginCallbackUrl } from "../config";
import { AuthService } from "./auth.service";
import { GetTokenDto } from "./dto/getToken.dto";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService, private authService: AuthService) {}

  /**
   * Redirect client to EVE SSO login page.
   */
  @Get("login")
  async login(@Res() response: Response) {
    const ssoLoginUrl = await this.ssoService.getClientLoginUrl();
    response.redirect(ssoLoginUrl);
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
    await this.ssoService.handleCallback(authorizationCode, state);
    const clientCallbackUrl = getClientLoginCallbackUrl(state);
    response.redirect(clientCallbackUrl);
  }

  /**
   * Callback for client to get Holenav's auth token.
   */
  @Post("getToken")
  async getToken(@Body() { state }: GetTokenDto) {
    const accessToken = await this.authService.login(state);
    return { accessToken };
  }

  /**
   * Check if an authentication token is still valid.
   */
  @Get("validateToken")
  async validateToken(@Req() request: Request) {
    const {
      headers: { accesstoken },
    } = request;

    if (!accesstoken || typeof accesstoken === "object") {
      throw new HttpException("Bad token format.", HttpStatus.BAD_REQUEST);
    }

    const valid = await this.authService.validateToken(accesstoken);
    if (!valid) {
      throw new HttpException("Token not valid.", HttpStatus.UNAUTHORIZED);
    }

    return "Token OK.";
  }
}
