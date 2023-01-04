import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { request } from "@octokit/request";
import { compare } from "compare-versions";
import {
  APP_VERSION,
  CLIENT_CD_OWNER,
  CLIENT_CD_REPO,
  CLIENT_CD_TOKEN,
  CLIENT_CD_WORKFLOW_ID,
} from "../config";
import { AppDataService } from "../app-data/app-data.service";

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private appDataService: AppDataService) {}

  async onApplicationBootstrap() {
    if (await this.appUpdated()) {
      this.logger.log("Application update detected.");
      await this.updateAppDataVersion();
      await this.triggerClientDeployment();
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

  /**
   * Trigger client deployment using a GitHub Actions webhook.
   */
  private async triggerClientDeployment(): Promise<void> {
    if (!CLIENT_CD_TOKEN) {
      this.logger.log("Skipping client deployment (CLIENT_CD_TOKEN not set).");
      return;
    }

    const url = "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches";
    const options = {
      headers: {
        authorization: `token ${CLIENT_CD_TOKEN}`,
      },
      owner: CLIENT_CD_OWNER,
      repo: CLIENT_CD_REPO,
      workflow_id: CLIENT_CD_WORKFLOW_ID,
      ref: "main",
      inputs: {
        version: `v${APP_VERSION}`,
      },
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
