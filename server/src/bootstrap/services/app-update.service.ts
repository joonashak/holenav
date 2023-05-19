import { Injectable, Logger } from "@nestjs/common";
import { request } from "@octokit/request";
import { compare } from "compare-versions";
import { AppDataService } from "../../app-data/app-data.service";
import {
  APP_VERSION,
  CLIENT_CD_OWNER,
  CLIENT_CD_REPO,
  CLIENT_CD_TOKEN,
  CLIENT_CD_WORKFLOW_ID,
  DISABLE_CLIENT_CD_VERSION_INPUT,
} from "../../config";

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

  /**
   * Trigger client deployment using a GitHub Actions webhook.
   */
  async triggerClientDeployment(): Promise<void> {
    if (!CLIENT_CD_TOKEN) {
      this.logger.log("Skipping client deployment (CLIENT_CD_TOKEN not set).");
      return;
    }

    const url = "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches";

    const inputs = DISABLE_CLIENT_CD_VERSION_INPUT
      ? {}
      : {
          ref: `v${APP_VERSION}`,
        };

    const options = {
      headers: {
        authorization: `token ${CLIENT_CD_TOKEN}`,
      },
      owner: CLIENT_CD_OWNER,
      repo: CLIENT_CD_REPO,
      workflow_id: CLIENT_CD_WORKFLOW_ID,
      ref: "main",
      inputs,
    };

    try {
      await request(url, options);
    } catch (error) {
      this.logger.warn("Request to client deployment webhook failed with the following error:");
      throw error;
    }

    this.logger.log("Client deployment triggered.");
  }
}
