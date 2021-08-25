import { Module } from "@nestjs/common";
import { CharacterModule } from "../../entities/character/character.module";
import { CharacterService } from "../../entities/character/character.service";
import { SsoService } from "./sso.service";
import { SsoStateModule } from "./ssoState/ssoState.module";
import { SsoStateService } from "./ssoState/ssoState.service";

@Module({
  imports: [SsoStateModule, CharacterModule],
  providers: [SsoService, SsoStateService, CharacterService],
  exports: [SsoService],
})
export class SsoModule {}
