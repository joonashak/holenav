import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CharacterService } from "src/entities/character/character.service";
import { AuthService } from "./auth.service";
import { GetTokenDto } from "./dto/getToken.dto";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(
    private ssoService: SsoService,
    private characterService: CharacterService,
    private authService: AuthService,
  ) {}

  /**
   * Redirect client to EVE SSO login page.
   */
  @Get("login")
  async login(@Res() response: Response) {
    const ssoLoginUrl = await this.ssoService.getClientLoginUrl();
    response.redirect(ssoLoginUrl);
  }

  /**
   * Callback path for getting the authorization code after player auth with EVE SSO.
   */
  @Get("callback")
  async callback(
    @Query("code") authorizationCode: string,
    @Query("state") state: string,
    @Res() response: Response,
  ) {
    await this.ssoService.handleCallback(authorizationCode, state);
    return response.send("OK");
  }

  /**
   * Callback for client to get Holenav's auth token.
   */
  @Post("getToken")
  async getToken(@Body() { state }: GetTokenDto) {
    return this.authService.getToken(state);
  }
}
