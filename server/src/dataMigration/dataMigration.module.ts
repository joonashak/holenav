import { Module } from "@nestjs/common";
import { DataMigrationService } from "./dataMigration.service";

@Module({ providers: [DataMigrationService] })
export class DataMigrationModule {}
