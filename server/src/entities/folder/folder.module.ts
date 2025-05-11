import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { Folder, FolderSchema } from "./folder.model";
import { FolderResolver } from "./folder.resolver";
import { FolderService } from "./folder.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    FolderAccessControlModule,
    CloneBayModule.forChildren(),
  ],
  providers: [FolderService, FolderResolver],
  exports: [MongooseModule, FolderService],
})
export class FolderModule {}
