import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AuthenticationError } from "apollo-server-express";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { SessionService } from "./session/session.service";
import { SsoSessionService } from "./sso/ssoSession/ssoSession.service";

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

const testSsoLogin = {
  ssoLoginSuccess: true,
  key: "",
  type: null,
  character: testUser.main,
  user: testUser,
  expiry: null,
};

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let sessionService: SessionService;
  let ssoSessionService: SsoSessionService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: "asd",
          signOptions: { expiresIn: "30d" },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: SsoSessionService,
          useFactory: () => ({
            create: jest.fn(),
            verifySsoLoginSuccess: jest.fn(),
          }),
        },
        {
          provide: UserService,
          useFactory: () => ({
            findByCharacterOrCreateUser: jest.fn(),
          }),
        },
        {
          provide: SessionService,
          useFactory: () => ({
            create: jest.fn(),
          }),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    sessionService = module.get<SessionService>(SessionService);
    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("Can login by using SSO state secret", async () => {
    jest.spyOn(ssoSessionService, "verifySsoLoginSuccess").mockResolvedValueOnce(testSsoLogin);
    jest.spyOn(userService, "findByCharacterOrCreateUser").mockResolvedValueOnce(testUser);
    jest
      .spyOn(sessionService, "create")
      .mockResolvedValueOnce({ id: "aeg43", expiresAt: null, user: testUser });

    const token = await authService.login("asd");
    expect(jwtService.verify(token)).toBeTruthy();

    expect(ssoSessionService.verifySsoLoginSuccess).toBeCalledTimes(1);
    expect(ssoSessionService.verifySsoLoginSuccess).toBeCalledWith("asd");
    expect(userService.findByCharacterOrCreateUser).toBeCalledTimes(1);
    expect(userService.findByCharacterOrCreateUser).toBeCalledWith(testUser.main);
    expect(sessionService.create).toBeCalledTimes(1);
    expect(sessionService.create).toBeCalledWith(testUser);
  });

  it("Throws on invalid SSO login", async () => {
    jest
      .spyOn(ssoSessionService, "verifySsoLoginSuccess")
      .mockResolvedValueOnce({ ...testSsoLogin, ssoLoginSuccess: false });

    await expect(authService.login("")).rejects.toThrowError(AuthenticationError);
  });

  it("Accepts a valid token", () => {
    const sessionId = "jfasd8f";
    const testToken = jwtService.sign({ sessionId });
    expect(authService.verifyToken(testToken).sessionId).toEqual(sessionId);
  });

  it("Rejects an invalid token", () => {
    const sessionId = "jfasd8f";
    const testToken = jwtService.sign({ sessionId }).concat("a");
    expect(() => authService.verifyToken(testToken)).toThrowError(AuthenticationError);
  });

  it("Rejects a valid token with an invalid payload", () => {
    const testToken = jwtService.sign({});
    expect(() => authService.verifyToken(testToken)).toThrowError(AuthenticationError);
  });
});
