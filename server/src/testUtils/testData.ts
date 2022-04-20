import dayjs from "dayjs";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/ssoSession/ssoSession.model";
import SsoSessionTypes from "../auth/sso/ssoSession/ssoSessionTypes.enum";
import SystemRoles from "../user/roles/systemRoles.enum";
import { User } from "../user/user.model";

export const testUser: User = {
  id: "asd",
  alts: [],
  folderRoles: [],
  main: {
    name: "test character",
    esiId: "uske67ent",
    accessToken: "j67j64m",
    refreshToken: "g7i84nthg",
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
