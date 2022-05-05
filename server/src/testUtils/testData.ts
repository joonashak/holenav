import { hashSync } from "bcrypt";
import dayjs from "dayjs";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/ssoSession/ssoSession.model";
import SsoSessionTypes from "../auth/sso/ssoSession/ssoSessionTypes.enum";
import { Folder } from "../entities/folder/folder.model";
import FolderRoles from "../user/roles/folderRoles.enum";
import SystemRoles from "../user/roles/systemRoles.enum";
import { User } from "../user/user.model";

export const testFolder: Folder = {
  id: "test-folder",
  name: "Test Folder",
};

export const testUserPassword = "test-user-pwd";
export const testUserCredentials = {
  username: "test-user",
  passwordHash: hashSync(testUserPassword, 12),
};

export const testUser: User = {
  id: "asd",
  alts: [],
  folderRoles: [{ folder: testFolder.id as any, role: FolderRoles.READ }],
  main: {
    name: "test character",
    esiId: "uske67ent",
    accessToken: "j67j64m",
    refreshToken: "g7i84nthg",
    isMain: true,
  },
  settings: null,
  systemRole: SystemRoles.USER,
};

export const testSsoSession: SsoSession = {
  ssoLoginSuccess: false,
  key: "joas8",
  type: SsoSessionTypes.LOGIN,
  character: testUser.main,
  user: testUser,
  expiry: dayjs().add(5, "minute").toDate(),
};

export const testSession: Session = {
  id: "j0w98f",
  expiresAt: dayjs().add(30, "d").toDate(),
  user: testUser,
};

export const testSsoTokens = { accessToken: "99wejf", refreshToken: "djw0e" };

export const testSsoAccessTokenPayload = {
  CharacterName: "test name",
  CharacterId: "test-id",
};
