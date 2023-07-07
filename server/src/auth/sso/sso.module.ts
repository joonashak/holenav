import { Module } from "@nestjs/common";
import { CharacterModule } from "../../entities/character/character.module";
import { EsiModule } from "../../esi/esi.module";
import { SsoApiService } from "./sso-api.service";
import { SsoSessionModule } from "./sso-session/sso-session.module";
import { SsoTokenModule } from "./sso-token/sso-token.module";
import { ConfigurableSsoModule } from "./sso.module-definition";
import SsoResolver from "./sso.resolver";
import { SsoService } from "./sso.service";

@Module({
  imports: [SsoSessionModule, SsoTokenModule, CharacterModule, EsiModule],
  providers: [SsoService, SsoResolver, SsoApiService],
  exports: [SsoService, SsoApiService],
})
export class SsoModule extends ConfigurableSsoModule {}
