import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
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
