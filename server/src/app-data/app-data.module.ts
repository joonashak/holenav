import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppData, AppDataSchema } from "./app-data.model";
import { AppDataResolver } from "./app-data.resolver";
import { AppDataService } from "./app-data.service";
import { AppSettingsResolver } from "./settings/app-settings.resolver";
import { AppSettingsService } from "./settings/app-settings.service";

/**
 * Application metadata.
 */
@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: AppData.name, schema: AppDataSchema }])],
  providers: [AppDataService, AppDataResolver, AppSettingsService, AppSettingsResolver],
  exports: [AppDataService, AppSettingsService, MongooseModule],
})
export class AppDataModule {}
