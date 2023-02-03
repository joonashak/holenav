import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { SessionService } from "../auth/session/session.service";
import { SsoSessionService } from "../auth/sso/sso-session/sso-session.service";

@Injectable()
export class ScheduledTasksService {
  constructor(
    private sessionService: SessionService,
    private ssoSessionService: SsoSessionService,
  ) {}

  @Cron("0 3 * * * *")
  async removeExpiredSessions() {
    return this.sessionService.removeExpiredSessions();
  }

  @Cron("0 4 * * * *")
  async removeExpiredSsoSessions() {
    return this.ssoSessionService.removeExpiredSsoSessions();
  }
}
