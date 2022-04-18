import { ExecutionContext } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { SessionService } from "../session/session.service";
import { TokenAuthGuard } from "./tokenAuth.guard";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { MockAuthService, MockSessionService, MockUserService } from "../../testUtils/mockServices";
import { testSession } from "../../testUtils/testData";

const testToken = "jf0e8438b7ww";

const createContextWithHeaders = (headers: any): ExecutionContext => {
  const args: any = [{}, {}, { req: { headers } }, {}];
  const context = createMock<ExecutionContext>({
    getArgs: () => args,
    getType: () => "graphql",
  });
  return context;
};

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
    const context = createContextWithHeaders({ accesstoken: testToken });
    await expect(authGuard.canActivate(context)).resolves.toBe(true);
    expect(userService.findById).not.toBeCalled();
    expect(authService.verifyToken).toBeCalledTimes(1);
    expect(authService.verifyToken).toBeCalledWith(testToken);
    expect(sessionService.verifySession).toBeCalledTimes(1);
    expect(sessionService.verifySession).toBeCalledWith(testSession.id);
  });
});
