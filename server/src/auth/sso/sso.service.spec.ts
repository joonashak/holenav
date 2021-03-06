import { Test } from "@nestjs/testing";
import {
  MockCharacterService,
  MockSsoApiService,
  MockSsoSessionService,
  MockUserService,
} from "../../test-utils/mock-services";
import { UserService } from "../../user/user.service";
import { SsoService } from "./sso.service";
import { SsoApiService } from "./sso-api.service";
import { SsoSessionService } from "./sso-session/sso-session.service";
import { testSsoSession, testSsoTokens, testUser } from "../../test-utils/test-data";
import SsoSessionTypes from "./sso-session/sso-session-types.enum";

const expectedCallbackUrl = `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=test-callback-url&client_id=test-sso-client-id&state=${testSsoSession.key}`;

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
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    ssoService = module.get<SsoService>(SsoService);
    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoApiService = module.get<SsoApiService>(SsoApiService);
  });

  it("Initializes SSO login", async () => {
    await expect(ssoService.getSsoLoginUrl()).resolves.toEqual(expectedCallbackUrl);
    expect(ssoSessionService.createSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.createSsoSession).toBeCalledWith(null);
  });

  it("Initializes SSO login for adding an alt", async () => {
    await expect(ssoService.getSsoLoginUrl(testUser)).resolves.toEqual(expectedCallbackUrl);
    expect(ssoSessionService.createSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.createSsoSession).toBeCalledWith(testUser);
  });

  it("Handles SSO login callback correctly", async () => {
    await expect(ssoService.handleCallback("asd", testSsoSession.key)).resolves.toEqual(
      `test-client-url/login/${testSsoSession.key}`,
    );
    expect(ssoSessionService.verifySsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoSession).toBeCalledWith(testSsoSession.key);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledWith(testSsoSession.key, testUser.main);
    expect(userService.addAlt).toBeCalledTimes(0);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledWith(testSsoTokens.accessToken);
  });

  it("Adds a character and deletes the SSO session when adding an alt instead of logging in", async () => {
    jest
      .spyOn(ssoSessionService, "verifySsoSession")
      .mockResolvedValueOnce({ ...testSsoSession, type: SsoSessionTypes.ADD_CHARACTER });

    await expect(ssoService.handleCallback("asd", testSsoSession.key)).resolves.toEqual(
      "test-client-url",
    );
    expect(ssoSessionService.verifySsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoSession).toBeCalledWith(testSsoSession.key);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledWith(testSsoSession.key, testUser.main);
    expect(userService.addAlt).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledWith(testSsoTokens.accessToken);
    expect(ssoSessionService.removeSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.removeSsoSession).toBeCalledWith(testSsoSession.key);
  });
});
