import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppData, AppDataDocument } from "../app-data.model";
import { AppDataService } from "../app-data.service";

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>,
    private appDataService: AppDataService,
  ) {}

  /**
   * Check if user is allowed to register as per current app settings.
   */
  async userCanRegister(corporationEsiId: string, allianceEsiId: string): Promise<boolean> {
    const {
      settings: { registration },
    } = await this.appDataService.getAppData();

    if (!registration.enabled) {
      return false;
    }

    const allowedByCorporation =
      registration.allowedCorporations.includes(corporationEsiId) ||
      !registration.corporationFilterEnabled;

    const allowedByAlliance =
      registration.allowedAlliances.includes(allianceEsiId) || !registration.allianceFilterEnabled;

    if (!allowedByCorporation || !allowedByAlliance) {
      return false;
    }

    return true;
  }

  async addAllowedCorporation(esiId: string): Promise<AppDataDocument> {
    return this.pushToList("settings.registration.allowedCorporations", esiId);
  }

  async addAllowedAlliance(esiId: string): Promise<AppDataDocument> {
    return this.pushToList("settings.registration.allowedAlliances", esiId);
  }

  async removeAllowedCorporation(esiId: string): Promise<AppDataDocument> {
    return this.removeFromList("settings.registration.allowedCorporations", [esiId]);
  }

  async removeAllowedAlliance(esiId: string): Promise<AppDataDocument> {
    return this.removeFromList("settings.registration.allowedAlliances", [esiId]);
  }

  private async pushToList(key: string, value: any): Promise<AppDataDocument> {
    await this.appDataModel.updateOne(
      {},
      {
        $push: {
          [key]: value,
        },
      },
    );
    return this.appDataService.getAppData();
  }

  private async removeFromList(key: string, value: any[]): Promise<AppDataDocument> {
    await this.appDataModel.updateOne(
      {},
      {
        $pullAll: { [key]: value },
      },
    );

    return this.appDataService.getAppData();
  }
}
