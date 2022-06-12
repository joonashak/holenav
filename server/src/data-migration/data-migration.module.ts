import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../entities/folder/folder.module";
import { DataMigration, DataMigrationSchema } from "./data-migration.model";
import { DataMigrationService } from "./data-migration.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DataMigration.name, schema: DataMigrationSchema }]),
    FolderModule,
  ],
  providers: [DataMigrationService],
  exports: [DataMigrationService, MongooseModule],
})
export class DataMigrationModule {}
