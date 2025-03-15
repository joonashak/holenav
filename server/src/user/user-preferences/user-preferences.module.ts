import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  UserPreferences,
  UserPreferencesSchema,
} from "./user-preferences.model";
import { UserPreferencesResolver } from "./user-preferences.resolver";
import { UserPreferencesService } from "./user-preferences.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPreferences.name, schema: UserPreferencesSchema },
    ]),
    CloneBayModule.forChildren(),
  ],
  providers: [UserPreferencesService, UserPreferencesResolver],
  exports: [UserPreferencesService],
})
export class UserPreferencesModule {}
