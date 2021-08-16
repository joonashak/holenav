import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CharacterService } from "src/entities/character/character.service";
import { SsoService } from "./sso/sso.service";

@Controller("auth")
export class AuthController {
  constructor(private ssoService: SsoService, private characterService: CharacterService) {}

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
    // TODO: Check state parameter.
    await this.ssoService.verifySsoState(state);

    const { accessToken, refreshToken } = await this.ssoService.getTokens(authorizationCode);

    const jwtData = await this.ssoService.verifyAndDecodeToken(accessToken);
    console.log(jwtData);

    const data = {
      name: jwtData.CharacterName,
      esiId: jwtData.CharacterID,
      accessToken,
      refreshToken,
    };
    await this.characterService.upsert(data);

    return response.send("OK");
  }

  @Get("cookie-test")
  cookieTest(@Req() request: Request, @Res() response: Response) {
    console.log(request.headers);
    response.cookie("testing", "jeeje");
    return response.send("OK");
  }
}
