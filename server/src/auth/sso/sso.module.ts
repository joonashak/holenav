import { Module } from "@nestjs/common";
import { CharacterModule } from "../../entities/character/character.module";
import { CharacterService } from "../../entities/character/character.service";
import { SsoService } from "./sso.service";
import { SsoSessionModule } from "./ssoSession/ssoSession.module";
import { SsoSessionService } from "./ssoSession/ssoSession.service";

@Module({
  imports: [SsoSessionModule, CharacterModule],
  providers: [SsoService, SsoSessionService, CharacterService],
  exports: [SsoService],
})
export class SsoModule {}
