import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EsiModule } from "../../esi/esi.module";
import { EsiService } from "../../esi/esi.service";
import { CharacterSchema, HolenavCharacter } from "./character.model";
import { CharacterResolver } from "./character.resolver";
import { CharacterService } from "./character.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HolenavCharacter.name, schema: CharacterSchema },
    ]),
    EsiModule,
  ],
  providers: [CharacterService, CharacterResolver, EsiService],
  exports: [CharacterService, MongooseModule],
})
export class CharacterModule {}
