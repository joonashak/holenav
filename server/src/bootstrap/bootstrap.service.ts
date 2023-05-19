import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { AppUpdateService } from "./services/app-update.service";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private appUpdateService: AppUpdateService) {}

  async onApplicationBootstrap() {
    if (await this.appUpdateService.appUpdated()) {
      this.logger.log("Application update detected.");
      await this.appUpdateService.updateAppDataVersion();
      await this.appUpdateService.triggerClientDeployment();
    }
  }
}
