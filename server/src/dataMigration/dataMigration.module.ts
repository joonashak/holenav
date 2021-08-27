import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../entities/folder/folder.module";
import { DataMigration, DataMigrationSchema } from "./dataMigration.model";
import { DataMigrationService } from "./dataMigration.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DataMigration.name, schema: DataMigrationSchema }]),
    FolderModule,
  ],
  providers: [DataMigrationService],
})
export class DataMigrationModule {}
