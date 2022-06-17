import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LeanDocument, Model } from "mongoose";
import { AppData, AppDataDocument } from "./app-data.model";

@Injectable()
export class AppDataService {
  constructor(@InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>) {}

  async getAppData(): Promise<LeanDocument<AppDataDocument>> {
    const appData = await this.appDataModel.findOne();

    if (!appData) {
      return this.initialize();
    }

    return appData.toObject();
  }

  async updateAppData(update: Partial<AppData>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...current } = await this.getAppData();
    return this.appDataModel.create({ ...current, ...update });
  }

  private async initialize(): Promise<AppData> {
    return this.appDataModel.create({});
  }
}
