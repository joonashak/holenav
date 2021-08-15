import { Module } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { CharacterResolver } from "./character.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./character.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
  providers: [CharacterService, CharacterResolver],
})
export class CharacterModule {}
