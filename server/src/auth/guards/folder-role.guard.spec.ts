import { Test } from "@nestjs/testing";
import { Reflector } from "@nestjs/core";
import { mockContextWithTestFolderRole } from "../../test-utils/mock-context";
import { FolderRoleGuard, requiredFolderRoleKey } from "./folder-role.guard";
import { MockFolderService } from "../../test-utils/mock-services";
import { FolderService } from "../../entities/folder/folder.service";
import FolderRole from "../../user/roles/folder-role.enum";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

describe("FolderRoleGuard", () => {
  let folderRoleGuard: FolderRoleGuard;
  let folderService: FolderService;
  let reflector: Reflector;

  const assertReflectorCall = () => {
    expect(reflector.get).toBeCalledTimes(1);
    expect(reflector.get).toBeCalledWith(requiredFolderRoleKey, {});
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FolderRoleGuard,
        MockFolderService,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    folderRoleGuard = module.get<FolderRoleGuard>(FolderRoleGuard);
    folderService = module.get<FolderService>(FolderService);
    reflector = module.get<Reflector>(Reflector);
  });

  describe("Accept", () => {
    it("Equal role", async () => {
      const context = mockContextWithTestFolderRole(FolderRole.READ);
      jest.spyOn(reflector, "get").mockReturnValueOnce(FolderRole.READ);
      await expect(folderRoleGuard.canActivate(context)).resolves.toBe(true);
      assertReflectorCall();
    });

    it("Higher role", async () => {
      const context = mockContextWithTestFolderRole(FolderRole.WRITE);
      jest.spyOn(reflector, "get").mockReturnValueOnce(FolderRole.READ);
      await expect(folderRoleGuard.canActivate(context)).resolves.toBe(true);
      assertReflectorCall();
    });
  });

  describe("Reject", () => {
    it("Lower role", async () => {
      const context = mockContextWithTestFolderRole(FolderRole.WRITE);
      jest.spyOn(reflector, "get").mockReturnValueOnce(FolderRole.MANAGE);
      await expect(folderRoleGuard.canActivate(context)).resolves.toBe(false);
      assertReflectorCall();
    });

    it("Required role is missing from request metadata", async () => {
      const context = mockContextWithTestFolderRole(FolderRole.WRITE);
      await expect(folderRoleGuard.canActivate(context)).rejects.toThrow(
        InternalServerErrorException,
      );
      assertReflectorCall();
    });

    it("Active folder is missing from request headers", async () => {
      const context = mockContextWithTestFolderRole(FolderRole.WRITE, {});
      jest.spyOn(reflector, "get").mockReturnValueOnce(FolderRole.READ);
      await expect(folderRoleGuard.canActivate(context)).rejects.toThrow(BadRequestException);
      assertReflectorCall();
    });

    it("Active folder does not exist in database", async () => {
      jest.spyOn(folderService, "getFolderById").mockResolvedValueOnce(null);
      const context = mockContextWithTestFolderRole(FolderRole.READ);
      jest.spyOn(reflector, "get").mockReturnValueOnce(FolderRole.READ);
      await expect(folderRoleGuard.canActivate(context)).rejects.toThrow(BadRequestException);
      assertReflectorCall();
    });
  });
});
