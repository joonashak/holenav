import { Module } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./character.model";
import { CharacterResolver } from "./character.resolver";

@Module({
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
  providers: [CharacterService, CharacterResolver],
  exports: [CharacterService, MongooseModule],
})
export class CharacterModule {}
