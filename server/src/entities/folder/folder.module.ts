import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { UserModule } from "../../user/user.module";
import { UserService } from "../../user/user.service";
import { CharacterModule } from "../character/character.module";
import { ActiveFolderService } from "./active-folder.service";
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
  exports: [MongooseModule, FolderService, ActiveFolderService],
  providers: [FolderService, FolderResolver, UserService, ActiveFolderService],
})
export class FolderModule {}
