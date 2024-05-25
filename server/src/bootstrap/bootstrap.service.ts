import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { AppDataService } from "../app-data/app-data.service";
import { AppUpdateService } from "./services/app-update.service";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(
    private appUpdateService: AppUpdateService,
    private appDataService: AppDataService,
  ) {}

  async onApplicationBootstrap() {
    await this.appDataService.initialize();

    if (await this.appUpdateService.appUpdated()) {
      this.logger.log("Application update detected.");
      await this.appUpdateService.updateAppDataVersion();
      await this.appUpdateService.triggerClientDeployment();
    }
  }
}
