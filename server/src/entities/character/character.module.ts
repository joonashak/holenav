import { Module } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./character.model";
import { CharacterResolver } from "./character.resolver";
import { EsiModule } from "../../esi/esi.module";
import { EsiService } from "../../esi/esi.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    EsiModule,
  ],
  providers: [CharacterService, CharacterResolver, EsiService],
  exports: [CharacterService, MongooseModule],
})
export class CharacterModule {}
