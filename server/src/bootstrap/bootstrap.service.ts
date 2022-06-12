import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { compare } from "compare-versions";
import { APP_VERSION } from "../config";
import { AppDataService } from "../entities/app-data/app-data.service";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private appDataService: AppDataService) {}

  async onApplicationBootstrap() {
    if (await this.appUpdated()) {
      this.logger.log("Application update detected.");
      await this.updateAppDataVersion();
    }
  }

  private async appUpdated(): Promise<boolean> {
    const { appVersion: oldVersion } = await this.appDataService.getAppData();

    if (!oldVersion) {
      return true;
    }

    return compare(APP_VERSION, oldVersion, ">");
  }

  private async updateAppDataVersion(): Promise<void> {
    await this.appDataService.updateAppData({ appVersion: APP_VERSION });
  }
}
