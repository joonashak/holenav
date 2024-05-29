/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationError } from "@nestjs/apollo";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { testSsoSession, testUser } from "../../../test-utils/test-data";
import SsoSessionType from "./sso-session-type.enum";
import { SsoSession } from "./sso-session.model";
import { SsoSessionService } from "./sso-session.service";

describe("SsoSessionService", () => {
  let ssoSessionService: SsoSessionService;
  let ssoSessionModel: Model<SsoSession>;
  let removeSsoSessionSpy: jest.SpyInstance;
  let verifySsoSessionSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SsoSessionService,
        {
          provide: getModelToken(SsoSession.name),
          useFactory: () => ({
            create: jest.fn().mockResolvedValue(testSsoSession),
            findOne: jest.fn(() => ({ populate: () => testSsoSession })),
            findOneAndDelete: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteMany: jest.fn(),
          }),
        },
      ],
    }).compile();

    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoSessionModel = module.get<Model<SsoSession>>(
      getModelToken(SsoSession.name),
    );
    removeSsoSessionSpy = jest.spyOn(ssoSessionService, "removeSsoSession");
    verifySsoSessionSpy = jest.spyOn(ssoSessionService, "verifySsoSession");
  });

  describe("Create and remove", () => {
    it("Create new SSO state for logging in", async () => {
      await expect(ssoSessionService.createSsoSession(null)).resolves.toEqual(
        testSsoSession,
      );
      expect(ssoSessionModel.create).toBeCalledTimes(1);

      const call: any = jest.spyOn(ssoSessionModel, "create").mock.calls[0][0];
      expect(Object.keys(call)).toEqual(["key", "type", "user", "expiry"]);
      expect(call.type).toEqual(SsoSessionType.LOGIN);
      expect(call.user).toBeNull();
      expect(new Date(call.expiry) > new Date()).toBeTruthy();
      expect(
        new Date(call.expiry) <= dayjs().add(5, "minute").toDate(),
      ).toBeTruthy();
    });

    it("Create new SSO state for adding new character", async () => {
      await expect(
        ssoSessionService.createSsoSession(testUser),
      ).resolves.toEqual(testSsoSession);
      expect(ssoSessionModel.create).toBeCalledTimes(1);

      const call: any = jest.spyOn(ssoSessionModel, "create").mock.calls[0][0];
      expect(Object.keys(call)).toEqual(["key", "type", "user", "expiry"]);
      expect(call.type).toEqual(SsoSessionType.ADD_CHARACTER);
      expect(call.user).toEqual(testUser);
      expect(new Date(call.expiry) > new Date()).toBeTruthy();
      expect(
        new Date(call.expiry) <= dayjs().add(5, "minute").toDate(),
      ).toBeTruthy();
    });

    it("Remove SSO session", async () => {
      await expect(
        ssoSessionService.removeSsoSession(testSsoSession.key),
      ).resolves.not.toThrow();
      expect(ssoSessionModel.findOneAndDelete).toBeCalledWith({
        key: testSsoSession.key,
      });
    });

    it("Remove expired sessions", async () => {
      await expect(
        ssoSessionService.removeExpiredSsoSessions(),
      ).resolves.not.toThrow();
      const query: any = jest.spyOn(ssoSessionModel, "deleteMany").mock
        .calls[0][0];
      expect(dayjs(query.expiry.$lte).isSame(dayjs(), "s")).toBe(true);
    });
  });

  describe("Verify SSO session", () => {
    it("Accept valid session", async () => {
      await expect(
        ssoSessionService.verifySsoSession(testSsoSession.key),
      ).resolves.toEqual(testSsoSession);
      expect(ssoSessionModel.findOne).toBeCalledWith({
        key: testSsoSession.key,
      });
    });

    it("Reject missing session", async () => {
      jest
        .spyOn(ssoSessionModel, "findOne")
        .mockImplementationOnce(() => ({ populate: () => null }) as any);

      await expect(
        ssoSessionService.verifySsoSession(testSsoSession.key),
      ).rejects.toThrowError(AuthenticationError);
    });

    it("Reject expired session", async () => {
      jest.spyOn(ssoSessionModel, "findOne").mockImplementationOnce(
        () =>
          ({
            populate: () => ({
              ...testSsoSession,
              expiry: dayjs().subtract(1, "second").toDate(),
            }),
          }) as any,
      );

      await expect(
        ssoSessionService.verifySsoSession(testSsoSession.key),
      ).rejects.toThrowError(AuthenticationError);
      expect(removeSsoSessionSpy).toBeCalledTimes(1);
      expect(removeSsoSessionSpy).toBeCalledWith(testSsoSession.key);
    });
  });

  describe("SSO login status", () => {
    it("Mark SSO login as successful", async () => {
      await expect(
        ssoSessionService.setSsoLoginSuccess(
          testSsoSession.key,
          testSsoSession.character,
        ),
      ).resolves.not.toThrow();

      expect(ssoSessionModel.findOneAndUpdate).toBeCalledTimes(1);
      expect(ssoSessionModel.findOneAndUpdate).toBeCalledWith(
        { key: testSsoSession.key },
        { ssoLoginSuccess: true, character: testSsoSession.character },
      );
      expect(verifySsoSessionSpy).toBeCalledTimes(1);
      expect(verifySsoSessionSpy).toBeCalledWith(testSsoSession.key);
    });

    it("Verify with successful login status", async () => {
      const successulSsoSession = { ...testSsoSession, ssoLoginSuccess: true };
      verifySsoSessionSpy = jest
        .spyOn(ssoSessionService, "verifySsoSession")
        .mockResolvedValueOnce(successulSsoSession);

      await expect(
        ssoSessionService.verifySsoLoginSuccess(testSsoSession.key),
      ).resolves.toEqual(successulSsoSession);
      expect(verifySsoSessionSpy).toBeCalledTimes(1);
      expect(verifySsoSessionSpy).toBeCalledWith(successulSsoSession.key);
      expect(removeSsoSessionSpy).toBeCalledTimes(1);
      expect(removeSsoSessionSpy).toBeCalledWith(testSsoSession.key);
    });

    it("Reject with unsuccessful login status", async () => {
      const unsuccessulSsoSession = {
        ...testSsoSession,
        ssoLoginSuccess: false,
      };
      jest
        .spyOn(ssoSessionService, "verifySsoSession")
        .mockResolvedValueOnce(unsuccessulSsoSession);

      await expect(
        ssoSessionService.verifySsoLoginSuccess(testSsoSession.key),
      ).rejects.toThrowError(AuthenticationError);
    });

    it("Reject with wrong SSO session type", async () => {
      const addCharacterSsoSession = {
        ...testSsoSession,
        ssoLoginSuccess: true,
        type: SsoSessionType.ADD_CHARACTER,
      };
      jest
        .spyOn(ssoSessionService, "verifySsoSession")
        .mockResolvedValueOnce(addCharacterSsoSession);

      await expect(
        ssoSessionService.verifySsoLoginSuccess(testSsoSession.key),
      ).rejects.toThrowError(AuthenticationError);
    });
  });
});
