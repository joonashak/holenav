import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "../entities/system/system.model";
import { DataMigrationService } from "./dataMigration.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }])],
  providers: [DataMigrationService],
})
export class DataMigrationModule {}
