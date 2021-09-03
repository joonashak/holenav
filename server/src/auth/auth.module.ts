import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CharacterService } from "../entities/character/character.service";
import { AuthController } from "./auth.controller";
import { SsoService } from "./sso/sso.service";
import { AuthService } from "./auth.service";
import { SsoStateService } from "./sso/ssoState/ssoState.service";
import { UserService } from "../user/user.service";
import { RoleService } from "../role/role.service";
import { UserModule } from "../user/user.module";
import { RoleModule } from "../role/role.module";
import { CharacterModule } from "../entities/character/character.module";
import { SsoStateModule } from "./sso/ssoState/ssoState.module";
import { FolderService } from "../entities/folder/folder.service";
import { FolderModule } from "../entities/folder/folder.module";
import { jwtSecret } from "../config";

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "30d" },
    }),
    UserModule,
    RoleModule,
    CharacterModule,
    SsoStateModule,
    FolderModule,
  ],
  providers: [
    SsoService,
    SsoStateService,
    CharacterService,
    AuthService,
    UserService,
    RoleService,
    FolderService,
  ],
})
export class AuthModule {}
