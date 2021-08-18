import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "../entities/system/system.model";
import { DataMigration, DataMigrationSchema } from "./dataMigration.model";
import { DataMigrationService } from "./dataMigration.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: System.name, schema: SystemSchema },
      { name: DataMigration.name, schema: DataMigrationSchema },
    ]),
  ],
  providers: [DataMigrationService],
})
export class DataMigrationModule {}
