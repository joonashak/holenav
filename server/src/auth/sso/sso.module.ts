import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "src/entities/character/character.model";
import { CharacterService } from "../../entities/character/character.service";
import { SsoService } from "./sso.service";
import { SsoState, SsoStateSchema } from "./ssoState/ssoState.model";
import { SsoStateService } from "./ssoState/ssoState.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: SsoState.name, schema: SsoStateSchema },
    ]),
  ],
  providers: [SsoService, SsoStateService, CharacterService],
})
export class SsoModule {}
