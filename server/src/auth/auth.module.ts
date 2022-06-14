import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { SsoService } from "./sso/sso.service";
import { AuthService } from "./auth.service";
import { CharacterModule } from "../entities/character/character.module";
import { JWT_LIFETIME, JWT_SECRET } from "../config";
import { SsoSessionModule } from "./sso/sso-session/sso-session.module";
import AuthResolver from "./auth.resolver";
import { SsoModule } from "./sso/sso.module";
import { SessionModule } from "./session/session.module";
import { SessionService } from "./session/session.service";

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_LIFETIME },
    }),
    CharacterModule,
    SsoModule,
    SsoSessionModule,
    SessionModule,
  ],
  providers: [SsoService, AuthService, AuthResolver, SessionService],
  exports: [JwtModule, AuthService, SessionService],
})
export class AuthModule {}
