import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderService } from "../entities/folder/folder.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "../config";
import { UserSettingsService } from "./settings/userSettings.service";
import { CharacterModule } from "../entities/character/character.module";
import { CharacterService } from "../entities/character/character.service";
import { Credentials, CredentialsSchema } from "./credentials/credentials.model";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Credentials.name, schema: CredentialsSchema },
    ]),
    JwtModule.register({
      secret: jwtSecret,
    }),
    CharacterModule,
  ],
  providers: [UserService, UserSettingsService, FolderService, CharacterService, UserResolver],
  exports: [UserService, UserSettingsService, MongooseModule],
})
export class UserModule {}
