import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Folder, FolderSchema } from "./folder.model";
import { FolderService } from "./folder.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])],
  exports: [MongooseModule, FolderService],
  providers: [FolderService],
})
export class FolderModule {}
