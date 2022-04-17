import { Test } from "@nestjs/testing";
import { CharacterService } from "../../entities/character/character.service";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";
import { SsoService } from "./sso.service";
import { SsoApiService } from "./ssoApi.service";
import { SsoSessionService } from "./ssoSession/ssoSession.service";
import SsoSessionTypes from "./ssoSession/ssoSessionTypes.enum";

const testUser: User = {
  id: "asd",
  alts: [],
  folderRoles: [],
  main: {
    name: "test character",
    esiId: "uske67ent",
    accessToken: "j67j64m",
    refreshToken: "g7i84nthg",
  },
  settings: null,
  systemRole: null,
};

const testSsoSession = {
  ssoLoginSuccess: true,
  key: "joas8",
  type: null,
  character: testUser.main,
  user: testUser,
  expiry: null,
};

describe("AuthService", () => {
  let userService: UserService;
  let ssoService: SsoService;
  let ssoSessionService: SsoSessionService;
  let ssoApiService: SsoApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SsoService,
        {
          provide: SsoSessionService,
          useFactory: () => ({
            verifySsoSession: jest.fn(),
            setSsoLoginSuccess: jest.fn(),
            createSsoSession: jest.fn(),
          }),
        },
        {
          provide: UserService,
          useFactory: () => ({
            addAlt: jest.fn(),
          }),
        },
        {
          provide: CharacterService,
          useFactory: () => ({
            upsert: jest.fn(async () => testUser.main),
          }),
        },
        {
          provide: SsoApiService,
          useFactory: () => ({
            getSsoTokens: jest.fn(),
            verifyAndDecodeSsoAccessToken: jest.fn(),
          }),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    ssoService = module.get<SsoService>(SsoService);
    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoApiService = module.get<SsoApiService>(SsoApiService);
  });

  it("Initializes SSO login", async () => {
    jest.spyOn(ssoSessionService, "createSsoSession").mockResolvedValueOnce(testSsoSession);

    await expect(ssoService.getSsoLoginUrl()).resolves.toEqual(
      `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=undefined&client_id=undefined&state=${testSsoSession.key}`,
    );
    expect(ssoSessionService.createSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.createSsoSession).toBeCalledWith(null);
  });

  it("Initializes SSO login for adding an alt", async () => {
    jest.spyOn(ssoSessionService, "createSsoSession").mockResolvedValueOnce(testSsoSession);

    await expect(ssoService.getSsoLoginUrl(testUser)).resolves.toEqual(
      `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=undefined&client_id=undefined&state=${testSsoSession.key}`,
    );
    expect(ssoSessionService.createSsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.createSsoSession).toBeCalledWith(testUser);
  });

  it("Handles SSO login callback correctly", async () => {
    jest
      .spyOn(ssoSessionService, "verifySsoSession")
      .mockResolvedValueOnce({ ...testSsoSession, type: SsoSessionTypes.LOGIN });
    jest
      .spyOn(ssoApiService, "getSsoTokens")
      .mockResolvedValueOnce({ accessToken: "99wejf", refreshToken: "djw0e" });
    jest.spyOn(ssoApiService, "verifyAndDecodeSsoAccessToken").mockResolvedValueOnce({
      CharacterName: "test name",
      CharacterId: "test-id",
    });

    await expect(ssoService.handleCallback("asd", testSsoSession.key)).resolves.toEqual(
      `undefined/login/${testSsoSession.key}`,
    );
    expect(ssoSessionService.verifySsoSession).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoSession).toBeCalledWith(testSsoSession.key);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.setSsoLoginSuccess).toBeCalledWith(testSsoSession.key, testUser.main);
    expect(userService.addAlt).toBeCalledTimes(0);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
    expect(ssoApiService.verifyAndDecodeSsoAccessToken).toBeCalledWith("99wejf");
  });
});
