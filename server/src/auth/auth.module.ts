import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_LIFETIME, JWT_SECRET } from "../config";
import { CharacterModule } from "../entities/character/character.module";
import { EsiModule } from "../esi/esi.module";
import AuthResolver from "./auth.resolver";
import { AuthService } from "./auth.service";
import { SessionModule } from "./session/session.module";
import { SessionService } from "./session/session.service";
import { SsoSessionModule } from "./sso/sso-session/sso-session.module";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_LIFETIME },
    }),
    CharacterModule,
    SsoModule.register({ scopes: ["esi-search.search_structures.v1"] }),
    SsoSessionModule,
    SessionModule,
    EsiModule,
  ],
  providers: [AuthService, AuthResolver, SessionService],
  exports: [JwtModule, AuthService, SessionService],
})
export class AuthModule {}
