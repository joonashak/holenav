import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { User } from "../user/user.model";

export const mockContextWithRequest = (req: any): ExecutionContext => {
  const args: any = [{}, {}, { req }, {}];
  const context = createMock<ExecutionContext>({
    getArgs: () => args,
    getType: () => "graphql",
  });
  return context;
};

export const mockContextWithUser = (user: User): ExecutionContext =>
  mockContextWithRequest({ user });

export const mockContextWithHeaders = (headers: any): ExecutionContext =>
  mockContextWithRequest({ headers });
