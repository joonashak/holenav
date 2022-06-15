import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppData, AppDataSchema } from "./app-data.model";
import { AppDataResolver } from "./app-data.resolver";
import { AppDataService } from "./app-data.service";

/**
 * Application metadata.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: AppData.name, schema: AppDataSchema }])],
  providers: [AppDataService, AppDataResolver],
  exports: [AppDataService, MongooseModule],
})
export class AppDataModule {}
