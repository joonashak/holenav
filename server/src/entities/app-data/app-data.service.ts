import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppData, AppDataDocument } from "./app-data.model";

@Injectable()
export class AppDataService {
  constructor(@InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>) {}

  async getAppData(): Promise<AppData> {
    const appData = await this.appDataModel.findOne();

    if (!appData) {
      return this.initialize();
    }

    return appData;
  }

  async updateAppData(update: Partial<AppData>) {
    const current = await this.getAppData();
    return this.appDataModel.create({ ...current, ...update });
  }

  private async initialize(): Promise<AppData> {
    return this.appDataModel.create({ appVersion: "" });
  }
}
