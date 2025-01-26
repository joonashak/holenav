import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { ConnectionMaintenanceService } from "../entities/connection/connection-maintenance.service";
import { SignatureMaintenanceService } from "../entities/signature/signature-maintenance.service";

@Injectable()
export class MaintenanceService {
  constructor(
    private connectionMaintenanceService: ConnectionMaintenanceService,
    private signatureMaintenanceService: SignatureMaintenanceService,
  ) {}

  @Interval(5 * 60 * 1000) // Run every 5 minutes.
  async cleanUp() {
    const removedConnections =
      await this.connectionMaintenanceService.cleanUp();
    await this.signatureMaintenanceService.cleanUp(removedConnections);
  }
}
