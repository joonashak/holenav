import { hashSync } from "bcrypt";
import dayjs from "dayjs";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import SsoSessionType from "../auth/sso/sso-session/sso-session-type.enum";
import { Folder } from "../entities/folder/folder.model";
import FolderRole from "../user/roles/folder-role.enum";
import SystemRole from "../user/roles/system-role.enum";
import { User } from "../user/user.model";
import { Corporation } from "../entities/common/corporation.model";

export const testFolder: Folder = {
  id: "test-folder",
  name: "Test Folder",
};

export const testCorp: Corporation = {
  esiId: "123",
  name: "test-corp",
  ticker: "TEST",
};

export const testUserPassword = "test-user-pwd";
export const testUserCredentials = {
  username: "test-user",
  passwordHash: hashSync(testUserPassword, 12),
};

export const testUser: User = {
  id: "asd",
  alts: [],
  folderRoles: [{ folder: testFolder.id as any, role: FolderRole.READ }],
  main: {
    name: "test character",
    esiId: "uske67ent",
    accessToken: "j67j64m",
    refreshToken: "g7i84nthg",
    isMain: true,
    corporation: testCorp,
    alliance: null,
    portraitUrl: "",
  },
  settings: null,
  systemRole: SystemRole.USER,
};

export const testSsoSession: SsoSession = {
  ssoLoginSuccess: false,
  key: "joas8",
  type: SsoSessionType.LOGIN,
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
