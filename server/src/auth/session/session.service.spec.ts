import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { AuthenticationError } from "apollo-server-express";
import dayjs from "dayjs";
import { Model } from "mongoose";
import ms from "ms";
import { JWT_LIFETIME } from "../../config";
import { testSession, testUser } from "../../test-utils/test-data";
import { Session } from "./session.model";
import { SessionService } from "./session.service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let sessionModel: Model<Session>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: getModelToken(Session.name),
          useFactory: () => ({
            create: jest.fn().mockResolvedValue(testSession),
            findOne: jest.fn(() => ({ populate: () => testSession })),
            remove: jest.fn().mockResolvedValue({ deletedCount: 1 }),
          }),
        },
      ],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    sessionModel = module.get<Model<Session>>(getModelToken(Session.name));
  });

  it("Create session", async () => {
    await expect(sessionService.create(testUser)).resolves.toEqual(testSession);
    expect(sessionModel.create).toBeCalledTimes(1);
    const { expiresAt }: any = jest.spyOn(sessionModel, "create").mock.calls[0][0];
    const expectedExpiry = dayjs().add(ms(JWT_LIFETIME), "ms");
    expect(dayjs(expiresAt).isSame(expectedExpiry, "minute")).toBe(true);
  });

  it("Find session by ID", async () => {
    await expect(sessionService.findOneById(testSession.id)).resolves.toEqual(testSession);
    expect(sessionModel.findOne).toBeCalledTimes(1);
    expect(sessionModel.findOne).toBeCalledWith({ id: testSession.id });
  });

  it("Remove expired sessions", async () => {
    await expect(sessionService.removeExpiredSessions()).resolves.not.toThrow();
    const query: any = jest.spyOn(sessionModel, "remove").mock.calls[0][0];
    expect(dayjs(query.expiresAt.$lte).isSame(dayjs(), "s")).toBe(true);
  });

  describe("Verify session", () => {
    it("Accept valid session", async () => {
      await expect(sessionService.verifySession(testSession.id)).resolves.toEqual(testSession);
    });

    it("Reject missing session", () => {
      jest.spyOn(sessionModel, "findOne").mockImplementationOnce(
        () =>
          ({
            populate: () => null,
          } as any),
      );

      expect(sessionService.verifySession(testSession.id)).rejects.toThrowError(
        AuthenticationError,
      );
    });

    it("Reject expired session", async () => {
      jest.spyOn(sessionModel, "findOne").mockImplementationOnce(
        () =>
          ({
            populate: () => ({ ...testSession, expiresAt: dayjs().subtract(1, "s").toDate() }),
          } as any),
      );

      expect(sessionService.verifySession(testSession.id)).rejects.toThrowError(
        AuthenticationError,
      );
    });
  });
});
