import { Test } from "@nestjs/testing";
import {
  MockAppSettingsService,
  MockCharacterService,
  MockEsiService,
  MockSsoApiService,
  MockSsoSessionService,
  MockSsoTokenService,
  MockUserService,
} from "../../test-utils/mock-services";
import {
  testSsoSession,
  testSsoTokens,
  testUser,
} from "../../test-utils/test-data";
import { UserService } from "../../user/user.service";
import { SsoApiService } from "./sso-api.service";
import SsoSessionType from "./sso-session/sso-session-type.enum";
import { SsoSessionService } from "./sso-session/sso-session.service";
import { SSO_MODULE_CONFIG_TOKEN } from "./sso.module-definition";
import { SsoService } from "./sso.service";

describe("SsoService", () => {
  let userService: UserService;
  let ssoService: SsoService;
  let ssoSessionService: SsoSessionService;
  let ssoApiService: SsoApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SsoService,
        MockSsoSessionService,
        MockUserService,
        MockCharacterService,
        MockSsoApiService,
        MockAppSettingsService,
        MockEsiService,
        MockSsoTokenService,
        {
          provide: SSO_MODULE_CONFIG_TOKEN,
          useValue: {
            scopes: ["test-scope", "another.scope"],
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    ssoService = module.get<SsoService>(SsoService);
    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoApiService = module.get<SsoApiService>(SsoApiService);
  });

  it("Handles SSO login callback correctly", async () => {
    await expect(
      ssoService.handleCallback("asd", testSsoSession.key),
    ).resolves.toEqual(`test-client-url/login/${testSsoSession.key}`);
    expect(ssoSessionService.verifySsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoSession).toBeCalledWith(
      testSsoSession.key,
    );
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledWith(
      testSsoSession.key,
      testUser.main,
    );
    expect(userService.addAlt).toBeCalledTimes(0);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledWith(
      testSsoTokens.accessToken,
    );
  });

  it("Adds a character and deletes the SSO session when adding an alt instead of logging in", async () => {
    jest.spyOn(ssoSessionService, "verifySsoSession").mockResolvedValueOnce({
      ...testSsoSession,
      type: SsoSessionType.ADD_CHARACTER,
    });

    await expect(
      ssoService.handleCallback("asd", testSsoSession.key),
    ).resolves.toEqual("test-client-url");
    expect(ssoSessionService.verifySsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoSession).toBeCalledWith(
      testSsoSession.key,
    );
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledWith(
      testSsoSession.key,
      testUser.main,
    );
    expect(userService.addAlt).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledWith(
      testSsoTokens.accessToken,
    );
    expect(ssoSessionService.removeSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.removeSsoSession).toBeCalledWith(
      testSsoSession.key,
    );
  });
});
