import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { AppSettingsService } from "../../app-data/settings/app-settings.service";
import {
  CLIENT_URL,
  SSO_CALLBACK_URL,
  SSO_CLIENT_ID,
  getClientLoginCallbackUrl,
} from "../../config";
import { CharacterService } from "../../entities/character/character.service";
import { EsiService } from "../../esi/esi.service";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import { SsoApiService } from "./sso-api.service";
import SsoSessionType from "./sso-session/sso-session-type.enum";
import { SsoSessionService } from "./sso-session/sso-session.service";
import { SsoUrl } from "./sso-url.enum";
import { SSO_MODULE_CONFIG_TOKEN, SsoModuleConfig } from "./sso.module-definition";

@Injectable()
export class SsoService {
  constructor(
    @Inject(SSO_MODULE_CONFIG_TOKEN) private moduleConfig: SsoModuleConfig,
    private ssoSessionService: SsoSessionService,
    private characterService: CharacterService,
    private userService: UserService,
    private ssoApiService: SsoApiService,
    private appSettingsService: AppSettingsService,
    private esiService: EsiService,
  ) {}

  /**
   * Generate EVE SSO login page URL.
   */
  async getSsoLoginUrl(user: User = null) {
    const { key } = await this.ssoSessionService.createSsoSession(user);
    const scopes = this.moduleConfig.scopes.join(" ");
    const loginUrl = `${SsoUrl.Authorize}/?response_type=code&redirect_uri=${SSO_CALLBACK_URL}&client_id=${SSO_CLIENT_ID}&state=${key}&scope=${scopes}`;
    return encodeURI(loginUrl);
  }

  /**
   * Get the SSO tokens using the authorization code supplied by the user, save
   * them and update the SSO state with the character's ID.
   *
   * @returns URL to redirect the client to.
   */
  async handleCallback(authorizationCode: string, state: string): Promise<string> {
    // TODO: Refactor - this is too long and hard to understand.
    const ssoSession = await this.ssoSessionService.verifySsoSession(state);

    const { accessToken, refreshToken } = await this.ssoApiService.getSsoTokens(authorizationCode);
    const jwtData = await this.ssoApiService.verifyAndDecodeSsoAccessToken(accessToken);

    // If registering a new user, check the character against registration settings.
    const userExists = !!(await this.characterService.findByEsiId(jwtData.CharacterID));
    const userCanRegister = await this.userCanRegister(jwtData.CharacterID, ssoSession.type);
    if (!userExists && !userCanRegister) {
      await this.ssoSessionService.removeSsoSession(ssoSession.key);
      throw new ForbiddenException("User is not allowed to register.");
    }

    const character = await this.characterService.upsert({
      name: jwtData.CharacterName,
      esiId: jwtData.CharacterID,
      accessToken,
      refreshToken,
      isMain: false,
    });

    await this.ssoSessionService.setSsoLoginSuccess(state, character);

    if (ssoSession.type === SsoSessionType.ADD_CHARACTER) {
      await this.userService.addAlt(character, ssoSession.user.id);
      await this.ssoSessionService.removeSsoSession(ssoSession.key);
    }

    const clientCallbackUrl =
      ssoSession.type === SsoSessionType.LOGIN ? getClientLoginCallbackUrl(state) : CLIENT_URL;

    return clientCallbackUrl;
  }

  private async userCanRegister(
    characterId: string,
    ssoSessionType: SsoSessionType,
  ): Promise<boolean> {
    if (ssoSessionType === SsoSessionType.ADD_CHARACTER) {
      return true;
    }

    const character = await this.esiService.getCharacterPublicInfo(characterId);
    return this.appSettingsService.userCanRegister(
      character.corporation_id.toString(),
      (character.alliance_id || "").toString(),
    );
  }
}
