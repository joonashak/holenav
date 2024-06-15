import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
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
  ],
  providers: [
    UserPreferencesService,
    UserPreferencesResolver,
    CloneBayUserService,
  ],
  exports: [UserPreferencesService],
})
export class UserPreferencesModule {}
