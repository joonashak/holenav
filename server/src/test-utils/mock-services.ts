import { AppSettingsService } from "../app-data/settings/app-settings.service";
import { AuthService } from "../auth/auth.service";
import { SessionService } from "../auth/session/session.service";
import { SsoApiService } from "../auth/sso/sso-api.service";
import { SsoSessionService } from "../auth/sso/sso-session/sso-session.service";
import { CharacterService } from "../entities/character/character.service";
import { FolderService } from "../entities/folder/folder.service";
import { EsiService } from "../esi/esi.service";
import { UserService } from "../user/user.service";
import {
  testFolder,
  testSession,
  testSsoAccessTokenPayload,
  testSsoSession,
  testSsoTokens,
  testUser,
  testUserCredentials,
} from "./test-data";

const { fn } = jest;

export const MockSsoSessionService = {
  provide: SsoSessionService,
  useFactory: () => ({
    create: fn(),
    verifySsoLoginSuccess: fn(async () => ({ ...testSsoSession, ssoLoginSuccess: true })),
    verifySsoSession: fn(async () => testSsoSession),
    setSsoLoginSuccess: fn(),
    createSsoSession: fn(async () => testSsoSession),
    removeSsoSession: fn(),
  }),
};

export const MockUserService = {
  provide: UserService,
  useFactory: () => ({
    findByCharacterOrCreateUser: fn(async () => testUser),
    findById: fn(),
    addAlt: fn(),
    findWithCredentials: fn().mockResolvedValue({
      ...testUser,
      credentials: testUserCredentials,
    }),
  }),
};

export const MockCharacterService = {
  provide: CharacterService,
  useFactory: () => ({
    upsert: fn(async () => testUser.main),
  }),
};

export const MockSsoApiService = {
  provide: SsoApiService,
  useFactory: () => ({
    getSsoTokens: fn(async () => testSsoTokens),
    verifyAndDecodeSsoAccessToken: fn(async () => testSsoAccessTokenPayload),
  }),
};

export const MockSessionService = {
  provide: SessionService,
  useFactory: () => ({
    create: fn(async () => testSession),
    verifySession: fn().mockResolvedValue(testSession),
  }),
};

export const MockAuthService = {
  provide: AuthService,
  useFactory: () => ({
    verifyToken: fn().mockReturnValue({ sessionId: testSession.id }),
    validateUserCredentials: jest.fn().mockResolvedValue(testUser),
  }),
};

export const MockFolderService = {
  provide: FolderService,
  useFactory: () => ({
    getFolderById: fn().mockResolvedValue({ ...testFolder, _id: testFolder.id }),
  }),
};

export const MockAppSettingsService = {
  provide: AppSettingsService,
  useFactory: () => ({
    userCanRegister: fn().mockResolvedValue(true),
  }),
};

export const MockEsiService = {
  provide: EsiService,
  useFactory: () => ({
    getCharacterPublicInfo: fn().mockResolvedValue({ corporation_id: "" }),
  }),
};
