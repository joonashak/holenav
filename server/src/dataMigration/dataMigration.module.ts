import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SystemModule } from "../entities/system/system.module";
import { DataMigration, DataMigrationSchema } from "./dataMigration.model";
import { DataMigrationService } from "./dataMigration.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DataMigration.name, schema: DataMigrationSchema }]),
    SystemModule,
  ],
  providers: [DataMigrationService],
})
export class DataMigrationModule {}
