import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../entities/folder/folder.module";
import { FolderService } from "../entities/folder/folder.service";
import { RoleModule } from "../role/role.module";
import { RoleService } from "../role/role.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "../config";
import { UserSettingsService } from "./settings/userSettings.service";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtSecret,
    }),
    FolderModule,
    RoleModule,
  ],
  providers: [UserService, UserSettingsService, RoleService, FolderService, UserResolver],
  exports: [UserService, UserSettingsService, MongooseModule],
})
export class UserModule {}
