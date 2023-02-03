import { Module } from "@nestjs/common";
import { SsoSessionModule } from "../auth/sso/sso-session/sso-session.module";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
  imports: [SsoSessionModule],
  providers: [ScheduledTasksService],
})
export class ScheduledTasksModule {}
