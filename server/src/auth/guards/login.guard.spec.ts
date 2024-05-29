import { createMock } from "@golevelup/ts-jest";
import { AuthenticationError } from "@nestjs/apollo";
import { ExecutionContext } from "@nestjs/common";
import { GraphQLExecutionContext } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { JWT_LIFETIME, JWT_SECRET } from "../../config";
import {
  MockAuthService,
  MockSessionService,
} from "../../test-utils/mock-services";
import { AuthService } from "../auth.service";
import { SessionService } from "../session/session.service";
import { LoginGuard } from "./login.guard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createContextWithGqlArgs = (gqlArgs: any): ExecutionContext => {
  const gqlContext = createMock<GraphQLExecutionContext>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const args: any = [{}, gqlArgs, gqlContext, {}];
  const context = createMock<ExecutionContext>({
    getArgs: () => args,
    getType: () => "graphql",
  });
  return context;
};

describe("LoginGuard", () => {
  let authService: AuthService;
  let guard: LoginGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: JWT_LIFETIME },
        }),
      ],
      providers: [SessionService, MockAuthService, MockSessionService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    guard = new LoginGuard(authService);
  });

  it("Can login with valid credentials", async () => {
    const input = { username: "admin", password: "Abcd1234" };
    const context = createContextWithGqlArgs(input);

    await expect(guard.canActivate(context)).resolves.toEqual(true);
    expect(authService.validateUserCredentials).toBeCalledTimes(1);
    expect(authService.validateUserCredentials).toBeCalledWith(
      ...Object.values(input),
    );
  });

  it("Cannot login with invalid credentials", async () => {
    const context = createContextWithGqlArgs({});
    jest
      .spyOn(authService, "validateUserCredentials")
      .mockResolvedValueOnce(null);
    await expect(guard.canActivate(context)).rejects.toThrowError(
      AuthenticationError,
    );
  });
});
