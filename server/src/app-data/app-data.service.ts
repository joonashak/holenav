import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery } from "mongoose";
import { AppData, AppDataDocument } from "./app-data.model";
import defaultAppData from "./default-app-data";

@Injectable()
export class AppDataService {
  constructor(@InjectModel(AppData.name) private appDataModel: Model<AppDataDocument>) {}

  /**
   * Create default `AppData` object, if it does not exists. Throw, if multiple found.
   */
  async initialize(): Promise<void> {
    const current = await this.appDataModel.find();

    if (current.length === 0) {
      await this.appDataModel.create(defaultAppData);
    }

    if (current.length > 1) {
      throw new InternalServerErrorException(
        "Multiple AppData objects found. Maximum of one is supported",
      );
    }
  }

  async getAppData(): Promise<AppDataDocument> {
    return this.appDataModel.findOne();
  }

  async updateAppData(update: UpdateQuery<AppData>) {
    return this.appDataModel.findOneAndUpdate({}, update, { new: true });
  }
}
