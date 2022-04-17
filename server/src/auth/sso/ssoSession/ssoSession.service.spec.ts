import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
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
            create: jest.fn(async () => testSsoSession),
            findOneAndRemove: jest.fn(),
          }),
        },
      ],
    }).compile();

    ssoSessionService = module.get<SsoSessionService>(SsoSessionService);
    ssoSessionModel = module.get<Model<SsoSession>>(getModelToken(SsoSession.name));
  });

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
