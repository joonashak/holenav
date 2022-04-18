import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { AuthenticationError } from "apollo-server-express";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { testSsoSession, testUser } from "../../../testUtils/testData";
import { SsoSession } from "./ssoSession.model";
import { SsoSessionService } from "./ssoSession.service";
import SsoSessionTypes from "./ssoSessionTypes.enum";

describe("SsoSessionService", () => {
  let ssoSessionService: SsoSessionService;
  let ssoSessionModel: Model<SsoSession>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SsoSessionService,
        {
          provide: getModelToken(SsoSession.name),
          useFactory: () => ({
            create: jest.fn().mockResolvedValue(testSsoSession),
            findOne: jest.fn(() => ({ populate: () => testSsoSession })),
            findOneAndRemove: jest.fn(),
          }),
        },
      ],
    }).compile();

    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoSessionModel = module.get<Model<SsoSession>>(getModelToken(SsoSession.name));
  });

  describe("Create and remove", () => {
    it("Create new SSO state for logging in", async () => {
      await expect(ssoSessionService.createSsoSession(null)).resolves.toEqual(testSsoSession);
      expect(ssoSessionModel.create).toBeCalledTimes(1);

      const call: any = jest.spyOn(ssoSessionModel, "create").mock.calls[0][0];
      expect(Object.keys(call)).toEqual(["key", "type", "user", "expiry"]);
      expect(call.type).toEqual(SsoSessionTypes.LOGIN);
      expect(call.user).toBeNull();
      expect(new Date(call.expiry) > new Date()).toBeTruthy();
      expect(new Date(call.expiry) <= dayjs().add(5, "minute").toDate()).toBeTruthy();
    });

    it("Create new SSO state for adding new character", async () => {
      await expect(ssoSessionService.createSsoSession(testUser)).resolves.toEqual(testSsoSession);
      expect(ssoSessionModel.create).toBeCalledTimes(1);

      const call: any = jest.spyOn(ssoSessionModel, "create").mock.calls[0][0];
      expect(Object.keys(call)).toEqual(["key", "type", "user", "expiry"]);
      expect(call.type).toEqual(SsoSessionTypes.ADD_CHARACTER);
      expect(call.user).toEqual(testUser);
      expect(new Date(call.expiry) > new Date()).toBeTruthy();
      expect(new Date(call.expiry) <= dayjs().add(5, "minute").toDate()).toBeTruthy();
    });

    it("Remove SSO session", async () => {
      await expect(ssoSessionService.removeSsoSession(testSsoSession.key)).resolves.not.toThrow();
      expect(ssoSessionModel.findOneAndRemove).toBeCalledWith({ key: testSsoSession.key });
    });
  });

  describe("Verify SSO session", () => {
    it("Accept valid session", async () => {
      await expect(ssoSessionService.verifySsoSession(testSsoSession.key)).resolves.toEqual(
        testSsoSession,
      );
      expect(ssoSessionModel.findOne).toBeCalledWith({ key: testSsoSession.key });
    });

    it("Reject missing session", async () => {
      jest
        .spyOn(ssoSessionModel, "findOne")
        .mockImplementationOnce(() => ({ populate: () => null } as any));

      await expect(ssoSessionService.verifySsoSession(testSsoSession.key)).rejects.toThrowError(
        AuthenticationError,
      );
    });

    it("Reject expired session", async () => {
      jest.spyOn(ssoSessionModel, "findOne").mockImplementationOnce(
        () =>
          ({
            populate: () => ({
              ...testSsoSession,
              expiry: dayjs().subtract(1, "second").toDate(),
            }),
          } as any),
      );

      const removeSsoSessionSpy = jest.spyOn(ssoSessionService, "removeSsoSession");
      await expect(ssoSessionService.verifySsoSession(testSsoSession.key)).rejects.toThrowError(
        AuthenticationError,
      );
      expect(removeSsoSessionSpy).toBeCalledTimes(1);
      expect(removeSsoSessionSpy).toBeCalledWith(testSsoSession.key);
    });
  });
});
