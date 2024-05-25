import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthenticationError } from "apollo-server-express";
import dayjs from "dayjs";
import { Model } from "mongoose";
import ms from "ms";
import { JWT_LIFETIME } from "../../config";
import { User } from "../../user/user.model";
import { Session, SessionDocument } from "./session.model";

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async create(user: User): Promise<Session> {
    const expiresAt = dayjs().add(ms(JWT_LIFETIME), "ms").toDate();
    return this.sessionModel.create({ expiresAt, user });
  }

  async findOneById(id: string): Promise<Session> {
    return this.sessionModel.findOne({ id }).populate("user");
  }

  async deleteSession(id: string): Promise<void> {
    await this.sessionModel.deleteOne({ id });
  }

  /**
   * Verify that there is a `Session` associated with given `sessionId` and it
   * has not expired.
   *
   * @param sessionId ID of the session to verify.
   * @returns Session object.
   */
  async verifySession(sessionId: string): Promise<Session> {
    const session = await this.findOneById(sessionId);

    if (!session) {
      throw new AuthenticationError("Session was not found.");
    }

    if (session.expiresAt < new Date()) {
      throw new AuthenticationError("Session has expired.");
    }

    return session;
  }

  async removeExpiredSessions(): Promise<void> {
    const { deletedCount } = await this.sessionModel.deleteMany({
      expiresAt: { $lte: new Date() },
    });

    /* istanbul ignore next */
    if (deletedCount) {
      this.logger.log(
        `Removed ${deletedCount} session${deletedCount === 1 ? "" : "s"} as expired.`,
      );
    }
  }
}
