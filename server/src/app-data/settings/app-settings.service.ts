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
    await this.appDataModel.updateOne(
      {},
      {
        $push: {
          "settings.registration.allowedCorporations": esiId,
        },
      },
    );
    return this.appDataService.getAppData();
  }
}
