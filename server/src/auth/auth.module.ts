import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CharacterService } from "../entities/character/character.service";
import { AuthController } from "./auth.controller";
import { SsoService } from "./sso/sso.service";
import { AuthService } from "./auth.service";
import { RoleService } from "../role/role.service";
import { RoleModule } from "../role/role.module";
import { CharacterModule } from "../entities/character/character.module";
import { FolderService } from "../entities/folder/folder.service";
import { FolderModule } from "../entities/folder/folder.module";
import { jwtSecret } from "../config";
import { SsoSessionModule } from "./sso/ssoSession/ssoSession.module";
import { SsoSessionService } from "./sso/ssoSession/ssoSession.service";

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "30d" },
    }),
    RoleModule,
    CharacterModule,
    SsoSessionModule,
    FolderModule,
  ],
  providers: [
    SsoService,
    SsoSessionService,
    CharacterService,
    AuthService,
    RoleService,
    FolderService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
