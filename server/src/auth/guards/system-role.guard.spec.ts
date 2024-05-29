import { AuthenticationError } from "@nestjs/apollo";
import { InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { mockContextWithUser } from "../../test-utils/mock-context";
import { testUser } from "../../test-utils/test-data";
import SystemRole from "../../user/roles/system-role.enum";
import { requiredSystemRoleKey, SystemRoleGuard } from "./system-role.guard";

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
        systemRole: SystemRole.USER,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRole.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      assertReflectorCall();
    });

    it("Higher role", async () => {
      const context = mockContextWithUser({
        ...testUser,
        systemRole: SystemRole.MANAGER,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRole.USER);
      expect(systemRoleGuard.canActivate(context)).toBe(true);
      assertReflectorCall();
    });
  });

  describe("Reject", () => {
    it("Lower role", async () => {
      const context = mockContextWithUser({
        ...testUser,
        systemRole: SystemRole.MANAGER,
      });
      jest
        .spyOn(reflector, "get")
        .mockReturnValueOnce(SystemRole.ADMINISTRATOR);
      expect(systemRoleGuard.canActivate(context)).toBe(false);
      assertReflectorCall();
    });

    it("Invalid system role", async () => {
      const context = mockContextWithUser({
        ...testUser,
        systemRole: 5 as SystemRole,
      });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRole.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(
        AuthenticationError,
      );
      assertReflectorCall();
    });

    it("Required role is missing from request metadata", async () => {
      const context = mockContextWithUser(testUser);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(
        InternalServerErrorException,
      );
      assertReflectorCall();
    });

    it("User is missing from request metadata", async () => {
      const context = mockContextWithUser(undefined);
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRole.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow();
      assertReflectorCall();
    });

    it("User is missing system role", async () => {
      const context = mockContextWithUser({ ...testUser, systemRole: null });
      jest.spyOn(reflector, "get").mockReturnValueOnce(SystemRole.USER);
      expect(() => systemRoleGuard.canActivate(context)).toThrow(
        AuthenticationError,
      );
      assertReflectorCall();
    });
  });
});
