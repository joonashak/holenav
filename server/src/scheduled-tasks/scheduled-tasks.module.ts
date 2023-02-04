import { Module } from "@nestjs/common";
import { SsoSessionModule } from "../auth/sso/sso-session/sso-session.module";
import { SignatureMaintenanceService } from "../entities/signature/signature-maintenance.service";
import { SignatureModule } from "../entities/signature/signature.module";
import { ScheduledTasksService } from "./scheduled-tasks.service";

@Module({
  imports: [SsoSessionModule, SignatureModule],
  providers: [ScheduledTasksService, SignatureMaintenanceService],
})
export class ScheduledTasksModule {}
