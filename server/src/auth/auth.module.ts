import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Character, CharacterSchema } from "../entities/character/character.model";
import { CharacterService } from "../entities/character/character.service";
import { AuthController } from "./auth.controller";
import { SsoService } from "./sso/sso.service";
import { SsoState, SsoStateSchema } from "./sso/ssoState/ssoState.model";
import { AuthService } from "./auth.service";
import { SsoStateService } from "./sso/ssoState/ssoState.service";

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: SsoState.name, schema: SsoStateSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [SsoService, SsoStateService, CharacterService, AuthService],
})
export class AuthModule {}
