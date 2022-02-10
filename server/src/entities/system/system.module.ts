import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.model";
import { SystemService } from "./system.service";
import { SystemResolver } from "./system.resolver";
import { UserService } from "../../user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../../user/user.module";
import { FolderService } from "../folder/folder.service";
import { FolderModule } from "../folder/folder.module";
import { jwtSecret } from "../../config";
import { CharacterService } from "../character/character.service";
import { CharacterModule } from "../character/character.module";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }]),
    JwtModule.register({
      secret: jwtSecret,
    }),
    UserModule,
    FolderModule,
    CharacterModule,
  ],
  providers: [SystemService, SystemResolver, UserService, FolderService, CharacterService],
  exports: [SystemService, MongooseModule],
})
export class SystemModule {}
