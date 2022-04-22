import { InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Reflector } from "@nestjs/core";
import { requiredSystemRoleKey, SystemRoleGuard } from "./systemRole.guard";
import SystemRoles from "../../user/roles/systemRoles.enum";
import { testUser } from "../../testUtils/testData";
import { AuthenticationError } from "apollo-server-express";
import { mockContextWithUser } from "../../testUtils/mockContext";

describe("SystemRoleGuard", () => {
  let systemRoleGuard: SystemRoleGuard;
  let reflector: Reflector;

  const assertReflectorCall = () => {
    expect(reflector.get).toBeCalledTimes(1);
    expect(reflector.get).toBeCalledWith(requiredSystemRoleKey, {});
  };

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
      const context = mockContextWithUser({
        ...testUser,
        systemRole: SystemRoles.USER,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      assertReflectorCall();
    });

    it("Higher role", async () => {
      const context = mockContextWithUser({
        ...testUser,
        systemRole: SystemRoles.MANAGER,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      assertReflectorCall();
    });
  });

  describe("Reject", () => {
    it("Lower role", async () => {
      const context = mockContextWithUser({
        ...testUser,
        systemRole: SystemRoles.MANAGER,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.ADMINISTRATOR);
      expect(systemRoleGuard.canActivate(context)).toBe(false);
      assertReflectorCall();
    });

    it("Invalid system role", async () => {
      const context = mockContextWithUser({ ...testUser, systemRole: 5 });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(AuthenticationError);
      assertReflectorCall();
    });

    it("Required role is missing from request metadata", async () => {
      const context = mockContextWithUser(testUser);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(InternalServerErrorException);
      assertReflectorCall();
    });

    it("User is missing from request metadata", async () => {
      const context = mockContextWithUser(undefined);
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow();
      assertReflectorCall();
    });

    it("User is missing system role", async () => {
      const context = mockContextWithUser({ ...testUser, systemRole: null });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRoles.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(AuthenticationError);
      assertReflectorCall();
    });
  });
});
