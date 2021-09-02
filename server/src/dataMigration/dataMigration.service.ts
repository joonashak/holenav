import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataMigration } from "./dataMigration.model";
import { FolderService } from "../entities/folder/folder.service";
import { Signature, SignatureDocument } from "../entities/signature/signature.model";
import { SignatureService } from "../entities/signature/signature.service";
import { SystemService } from "../entities/system/system.service";

/**
 * Pretty crude hack to keep database contents up to date :sad_face:
 */
@Injectable()
export class DataMigrationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DataMigrationService.name);

  // Add new migrations here and they will be applied on next launch.
  private readonly migrations = {
    1: () => this.createDefaultFolder(),
  };

  constructor(
    @InjectModel(DataMigration.name) private dataMigrationModel: Model<DataMigration>,
    @InjectModel(Signature.name) private sigModel: Model<SignatureDocument>,
    private folderService: FolderService,
    private sigService: SignatureService,
    private systemService: SystemService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log("Starting data migration...");
    await this.migrate();
    this.logger.log("Data migration finished.");
  }

  async getVersion(): Promise<number> {
    try {
      const { version } = await this.dataMigrationModel.findOne();
      return version;
    } catch (error) {
      return 0;
    }
  }

  async updateVersion(version: number) {
    await this.dataMigrationModel.create({ version });
  }

  async migrate() {
    const currentVersion = await this.getVersion();
    const pendingVersions = Object.keys(this.migrations).filter(
      (version) => currentVersion < Number(version),
    );

    for (const version of pendingVersions) {
      await this.migrations[version]();
      await this.updateVersion(Number(version));
    }
  }

  async createDefaultFolder() {
    await this.folderService.createFolder("Default Folder");
  }
}
