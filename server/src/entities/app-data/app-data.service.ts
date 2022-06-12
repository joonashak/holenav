import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppData, AppDataDocument } from "./app-data.model";

@Injectable()
export class AppDataService {
  constructor(@InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>) {}

  async getAppData(): Promise<AppData> {
    return this.appDataModel.findOne();
  }

  async updateAppData(update: Partial<AppData>) {
    const current = await this.getAppData();
    return await this.appDataModel.create({ ...current, ...update });
  }
}
