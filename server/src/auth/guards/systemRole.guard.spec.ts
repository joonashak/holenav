import { ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { Reflector } from "@nestjs/core";
import { requiredSystemRoleKey, SystemRoleGuard } from "./systemRole.guard";
import SystemRoles from "../../user/roles/systemRoles.enum";
import { testUser } from "../../testUtils/testData";
import { AuthenticationError } from "apollo-server-express";

const createContextWithRequest = (req: any): ExecutionContext => {
  const args: any = [{}, {}, { req }, {}];
  const context = createMock<ExecutionContext>({
    getArgs: () => args,
    getType: () => "graphql",
  });
  return context;
};

describe("SystemRolehGuard", () => {
  let systemRoleGuard: SystemRoleGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SystemRoleGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    systemRoleGuard = module.get<SystemRoleGuard>(SystemRoleGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  describe("Accept", () => {
    it("Equal role", async () => {
      const context = createContextWithRequest({
        user: { ...testUser, systemRole: SystemRoles.USER },
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });

    it("Higher role", async () => {
      const context = createContextWithRequest({
        user: { ...testUser, systemRole: SystemRoles.MANAGER },
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });
  });

  describe("Reject", () => {
    it("Lower role", async () => {
      const context = createContextWithRequest({
        user: { ...testUser, systemRole: SystemRoles.MANAGER },
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.ADMINISTRATOR);
      expect(systemRoleGuard.canActivate(context)).toBe(false);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });

    it("Invalid system role", async () => {
      const context = createContextWithRequest({ user: { ...testUser, systemRole: 5 } });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(AuthenticationError);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });

    it("Role is missing from request metadata", async () => {
      const context = createContextWithRequest({ user: testUser });
      expect(() => systemRoleGuard.canActivate(context)).toThrow(InternalServerErrorException);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });

    it("User is missing from request metadata", async () => {
      const context = createContextWithRequest({ user: undefined });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow();
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });

    it("User is missing system role", async () => {
      const context = createContextWithRequest({ user: { ...testUser, systemRole: null } });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(AuthenticationError);
      expect(reflector.get).toBeCalledTimes(1);
      expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
    });
  });
});
