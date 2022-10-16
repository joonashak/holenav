import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
  ],
  exports: [MongooseModule, FolderService, ActiveFolderService],
  providers: [FolderService, FolderResolver, UserService, ActiveFolderService],
})
export class FolderModule {}
