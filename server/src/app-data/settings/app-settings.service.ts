import { Injectable } from "@nestjs/common";
import { AppDataService } from "../app-data.service";

@Injectable()
export class AppSettingsService {
  constructor(private appDataService: AppDataService) {}

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
}
