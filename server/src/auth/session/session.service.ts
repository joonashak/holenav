import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
import { AuthenticationError } from "apollo-server-express";
import { Model } from "mongoose";
import ms from "ms";
import { jwtLifetime } from "../../config";
import { User } from "../../user/user.model";
import { Session, SessionDocument } from "./session.model";

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  async create(user: User): Promise<Session> {
    const expiresAt = new Date(Date.now() + ms(jwtLifetime));
    return this.sessionModel.create({ expiresAt, user });
  }

  async findOneById(id: string): Promise<Session> {
    return this.sessionModel.findOne({ id }).populate("user");
  }

  /**
   * Verify that there is a `Session` associated with given `sessionId` and it has not expired.
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

  @Cron("0 3 * * * *")
  async removeExpiredSessions(): Promise<void> {
    const { deletedCount } = await this.sessionModel.remove({
      expiresAt: { $lte: new Date() },
    });

    if (deletedCount) {
      this.logger.log(
        `Removed ${deletedCount} session${deletedCount === 1 ? "" : "s"} as expired.`,
      );
    }
  }
}
