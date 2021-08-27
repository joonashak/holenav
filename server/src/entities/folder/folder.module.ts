import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Folder, FolderSchema } from "./folder.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])],
  exports: [MongooseModule],
})
export class FolderModule {}
