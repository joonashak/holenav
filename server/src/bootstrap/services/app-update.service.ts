import { Injectable, Logger } from "@nestjs/common";
import { compare } from "compare-versions";
import { AppDataService } from "../../app-data/app-data.service";
import { APP_VERSION } from "../../config";

@Injectable()
export class AppUpdateService {
  private readonly logger = new Logger(AppUpdateService.name);

  constructor(private appDataService: AppDataService) {}

  async appUpdated(): Promise<boolean> {
    const { appVersion: oldVersion } = await this.appDataService.getAppData();

    if (!oldVersion) {
      return true;
    }

    return compare(APP_VERSION, oldVersion, ">");
  }

  async updateAppDataVersion(): Promise<void> {
    await this.appDataService.updateAppData({ appVersion: APP_VERSION });
  }
}
