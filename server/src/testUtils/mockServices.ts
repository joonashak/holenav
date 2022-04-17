import { SessionService } from "../auth/session/session.service";
import { SsoApiService } from "../auth/sso/ssoApi.service";
import { SsoSessionService } from "../auth/sso/ssoSession/ssoSession.service";
import { CharacterService } from "../entities/character/character.service";
import { UserService } from "../user/user.service";
import {
  testSession,
  testSsoAccessTokenPayload,
  testSsoSession,
  testSsoTokens,
  testUser,
} from "./testData";

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
    addAlt: fn(),
  }),
};

export const MockCharacterService = {
  provide: CharacterService,
  useFactory: () => ({
    upsert: jest.fn(async () => testUser.main),
  }),
};

export const MockSsoApiService = {
  provide: SsoApiService,
  useFactory: () => ({
    getSsoTokens: jest.fn(async () => testSsoTokens),
    verifyAndDecodeSsoAccessToken: jest.fn(async () => testSsoAccessTokenPayload),
  }),
};

export const MockSessionService = {
  provide: SessionService,
  useFactory: () => ({
    create: jest.fn(async () => testSession),
  }),
};
