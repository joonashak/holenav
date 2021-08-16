import { Module } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./character.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
  providers: [CharacterService],
})
export class CharacterModule {}
