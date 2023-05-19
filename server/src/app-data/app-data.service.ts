import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppData, AppDataDocument } from "./app-data.model";

@Injectable()
export class AppDataService {
  constructor(@InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>) {}

  async getAppData(): Promise<AppDataDocument> {
    const appData = await this.appDataModel.findOne();

    if (!appData) {
      return this.initialize();
    }

    return appData;
  }

  async updateAppData(update: Partial<AppData>) {
    const appData = (await this.getAppData()).toObject();
    delete appData._id;
    return this.appDataModel.create({ ...appData, ...update });
  }

  private async initialize(): Promise<AppDataDocument> {
    return this.appDataModel.create({});
  }
}
