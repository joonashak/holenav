import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SystemService } from "../system/system.service";
import { Folder, FolderSchema } from "./folder.model";
import { FolderResolver } from "./folder.resolver";
import { FolderService } from "./folder.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])],
  exports: [MongooseModule, FolderService],
  providers: [FolderService, SystemService, FolderResolver],
})
export class FolderModule {}
