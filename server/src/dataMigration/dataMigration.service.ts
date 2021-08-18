import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { System, SystemDocument } from "../entities/system/system.model";
import systems from "../../assets/staticData/systems.json";
import { DataMigration } from "./dataMigration.model";

@Injectable()
export class DataMigrationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DataMigrationService.name);

  constructor(
    @InjectModel(System.name) private systemModel: Model<SystemDocument>,
    @InjectModel(DataMigration.name) private dataMigrationModel: Model<DataMigration>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log("Starting data migration...");

    const ops = systems.map(({ name, ...rest }) => ({
      updateOne: {
        filter: { name },
        update: { ...rest },
        upsert: true,
      },
    }));
    //await this.systemModel.bulkWrite(ops);

    this.logger.log("Data migration finished.");
  }

  async getVersion(): Promise<number> {
    const { version } = await this.dataMigrationModel.findOne();
    return version;
  }

  async updateVersion(version: number) {
    await this.dataMigrationModel.create({ version });
  }
}
