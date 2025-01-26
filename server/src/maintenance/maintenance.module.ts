import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConnectionModule } from "../entities/connection/connection.module";
import { SignatureModule } from "../entities/signature/signature.module";
import { MaintenanceService } from "./maintenance.service";

@Module({
  imports: [ScheduleModule.forRoot(), SignatureModule, ConnectionModule],
  providers: [MaintenanceService],
  exports: [ScheduleModule],
})
export class MaintenanceModule {}
