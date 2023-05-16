import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { JWT_SECRET } from "../config";
import { CharacterModule } from "../entities/character/character.module";
import { CharacterService } from "../entities/character/character.service";
import { FolderService } from "../entities/folder/folder.service";
import { EsiModule } from "../esi/esi.module";
import { Credentials, CredentialsSchema } from "./credentials/credentials.model";
import { UserSettingsService } from "./settings/user-settings.service";
import { UserRoleService } from "./user-role.service";
import { User, UserSchema } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Credentials.name, schema: CredentialsSchema },
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    CharacterModule,
    EsiModule,
  ],
  providers: [
    UserService,
    UserRoleService,
    UserSettingsService,
    FolderService,
    CharacterService,
    UserResolver,
  ],
  exports: [UserService, UserRoleService, UserSettingsService, MongooseModule, CharacterService],
})
export class UserModule {}
