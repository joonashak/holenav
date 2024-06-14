import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  UserPreferences,
  UserPreferencesSchema,
} from "./user-preferences.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPreferences.name, schema: UserPreferencesSchema },
    ]),
  ],
})
export class UserPreferencesModule {}
