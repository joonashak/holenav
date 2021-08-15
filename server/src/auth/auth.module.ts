import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "src/entities/character/character.model";
import { CharacterModule } from "src/entities/character/character.module";
import { CharacterService } from "src/entities/character/character.service";
import { AuthController } from "./auth.controller";
import { SsoModule } from "./sso/sso.module";
import { SsoService } from "./sso/sso.service";

@Module({
  controllers: [AuthController],
  imports: [
    SsoModule,
    CharacterModule,
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
  ],
  providers: [SsoService, CharacterService],
})
export class AuthModule {}
