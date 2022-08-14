import { hashSync } from "bcrypt";
import dayjs from "dayjs";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import SsoSessionType from "../auth/sso/sso-session/sso-session-type.enum";
import { Folder } from "../entities/folder/folder.model";
import FolderRole from "../user/roles/folder-role.enum";
import SystemRole from "../user/roles/system-role.enum";
import { User } from "../user/user.model";
import { Signature } from "../entities/signature/signature.model";
import SigType from "../entities/signature/enums/sig-type.enum";

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
  folderRoles: [{ folder: testFolder.id as any, role: FolderRole.READ }],
  main: {
    name: "test character",
    esiId: "uske67ent",
    accessToken: "j67j64m",
    refreshToken: "g7i84nthg",
    isMain: true,
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

export const testUnknownSig: Signature = {
  folder: testFolder,
  type: SigType.UNKNOWN,
  name: "Test Unknown Sig",
  systemName: "Jita",
};

export const testWormhole: Signature = {
  folder: testFolder,
  type: SigType.WORMHOLE,
  name: "Test Wormhole",
  systemName: "Amarr",
};
