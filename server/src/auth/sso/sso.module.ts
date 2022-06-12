import { Module } from "@nestjs/common";
import { CharacterModule } from "../../entities/character/character.module";
import SsoResolver from "./sso.resolver";
import { SsoService } from "./sso.service";
import { SsoApiService } from "./sso-api.service";
import { SsoSessionModule } from "./sso-session/sso-session.module";

@Module({
  imports: [SsoSessionModule, CharacterModule],
  providers: [SsoService, SsoResolver, SsoApiService],
  exports: [SsoService, SsoApiService],
})
export class SsoModule {}
