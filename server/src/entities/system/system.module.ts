import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.model";
import { SystemService } from "./system.service";
import { SystemResolver } from "./system.resolver";
import { UserService } from "../../user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { FolderService } from "../folder/folder.service";
import { JWT_SECRET } from "../../config";
import { CharacterService } from "../character/character.service";
import { CharacterModule } from "../character/character.module";
import { UserModule } from "../../user/user.module";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    CharacterModule,
    UserModule,
  ],
  providers: [SystemService, SystemResolver, UserService, FolderService, CharacterService],
  exports: [SystemService, MongooseModule, UserService],
})
export class SystemModule {}
