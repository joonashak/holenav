import { Module } from "@nestjs/common";
import { CharacterModule } from "../../entities/character/character.module";
import SsoResolver from "./sso.resolver";
import { SsoService } from "./sso.service";
import { SsoSessionModule } from "./ssoSession/ssoSession.module";

@Module({
  imports: [SsoSessionModule, CharacterModule],
  providers: [SsoService, SsoResolver],
  exports: [SsoService],
})
export class SsoModule {}
