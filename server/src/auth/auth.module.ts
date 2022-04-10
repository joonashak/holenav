import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { SsoService } from "./sso/sso.service";
import { AuthService } from "./auth.service";
import { CharacterModule } from "../entities/character/character.module";
import { jwtLifetime, jwtSecret } from "../config";
import { SsoSessionModule } from "./sso/ssoSession/ssoSession.module";
import AuthResolver from "./auth.resolver";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtLifetime },
    }),
    CharacterModule,
    SsoModule,
    SsoSessionModule,
  ],
  providers: [SsoService, AuthService, AuthResolver],
  exports: [JwtModule],
})
export class AuthModule {}
