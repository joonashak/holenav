import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import FolderRole from "../user/roles/folder-role.enum";
import { User } from "../user/user.model";
import { testFolder, testUser } from "./test-data";

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

export const mockContextWithTestFolderRole = (
  role: FolderRole,
  headers: any = { activefolder: testFolder.id },
): ExecutionContext =>
  mockContextWithRequest({
    user: { ...testUser, folderRoles: [{ folder: testFolder.id, role }] },
    headers,
  });
