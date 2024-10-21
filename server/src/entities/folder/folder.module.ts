import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { UserModule } from "../../user/user.module";
import { UserService } from "../../user/user.service";
import { CharacterModule } from "../character/character.module";
import { Folder, FolderSchema } from "./folder.model";
import { FolderResolver } from "./folder.resolver";
import { FolderService } from "./folder.service";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    CharacterModule,
    UserModule,
    FolderAccessControlModule,
  ],
  exports: [MongooseModule, FolderService],
  providers: [FolderService, FolderResolver, UserService],
})
export class FolderModule {}
