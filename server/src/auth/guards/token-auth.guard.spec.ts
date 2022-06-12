import { Test } from "@nestjs/testing";
import { AuthenticationError } from "apollo-server-express";
import { SessionService } from "../session/session.service";
import { TokenAuthGuard } from "./token-auth.guard";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import {
  MockAuthService,
  MockSessionService,
  MockUserService,
} from "../../test-utils/mock-services";
import { testSession } from "../../test-utils/test-data";
import mockUsers from "../../dev-tools/data/users";
import { mockContextWithHeaders } from "../../test-utils/mock-context";

const testToken = "jf0e8438b7ww";

describe("TokenAuthGuard", () => {
  let sessionService: SessionService;
  let userService: UserService;
  let authService: AuthService;
  let authGuard: TokenAuthGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MockSessionService, MockUserService, MockAuthService],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    authGuard = new TokenAuthGuard(userService, authService, sessionService);
  });

  it("Access granted with valid token and session", async () => {
    const context = mockContextWithHeaders({ accesstoken: testToken });
    await expect(authGuard.canActivate(context)).resolves.toBe(true);
    expect(userService.findById).not.toBeCalled();
    expect(authService.verifyToken).toBeCalledTimes(1);
    expect(authService.verifyToken).toBeCalledWith(testToken);
    expect(sessionService.verifySession).toBeCalledTimes(1);
    expect(sessionService.verifySession).toBeCalledWith(testSession.id);
  });

  it("Access denied with missing token", async () => {
    const context = mockContextWithHeaders({});
    await expect(authGuard.canActivate(context)).rejects.toThrowError(AuthenticationError);
    expect(userService.findById).not.toBeCalled();
    expect(authService.verifyToken).not.toBeCalled();
    expect(sessionService.verifySession).not.toBeCalled();
  });

  it("Access denied with missing user", async () => {
    const context = mockContextWithHeaders({ accesstoken: testToken });
    jest
      .spyOn(sessionService, "verifySession")
      .mockResolvedValueOnce({ ...testSession, user: null });
    await expect(authGuard.canActivate(context)).rejects.toThrowError(AuthenticationError);
    expect(userService.findById).not.toBeCalled();
    expect(authService.verifyToken).toBeCalledTimes(1);
    expect(authService.verifyToken).toBeCalledWith(testToken);
    expect(sessionService.verifySession).toBeCalledTimes(1);
    expect(sessionService.verifySession).toBeCalledWith(testSession.id);
  });

  it("Cannot mock users with devtools disabled", async () => {
    const context = mockContextWithHeaders({ accesstoken: mockUsers[0].id });
    await authGuard.canActivate(context);
    expect(userService.findById).not.toBeCalled();
  });
});
