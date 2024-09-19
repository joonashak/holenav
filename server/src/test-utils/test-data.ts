import { hashSync } from "bcrypt";
import dayjs from "dayjs";
import { Session } from "../auth/session/session.model";
import SsoSessionType from "../auth/sso/sso-session/sso-session-type.enum";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import { HolenavCorporation } from "../entities/common/corporation.model";
import { Folder } from "../entities/folder/folder.model";
import SystemRole from "../user/roles/system-role.enum";
import { HolenavUser } from "../user/user.model";

export const testFolder: Folder = {
  id: "test-folder",
  name: "Test Folder",
};

export const testCorp: HolenavCorporation = {
  esiId: "123",
  name: "test-corp",
  ticker: "TEST",
};

export const testUserPassword = "test-user-pwd";
export const testUserCredentials = {
  username: "test-user",
  passwordHash: hashSync(testUserPassword, 12),
};

export const testUser: HolenavUser = {
  id: "asd",
  alts: [],
  main: {
    name: "test character",
    esiId: "uske67ent",
    ssoToken: null,
    isMain: true,
    corporation: testCorp,
    alliance: null,
    portraitUrl: "",
  },
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
