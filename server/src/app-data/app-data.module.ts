import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppData, AppDataSchema } from "./app-data.model";
import { AppDataService } from "./app-data.service";

/**
 * Application metadata.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: AppData.name, schema: AppDataSchema }])],
  providers: [AppDataService],
  exports: [AppDataService, MongooseModule],
})
export class AppDataModule {}
