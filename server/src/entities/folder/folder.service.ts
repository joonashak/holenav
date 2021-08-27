import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder, FolderDocument } from "./folder.model";

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>) {}

  async getDefaultFolder(): Promise<Folder> {
    return this.folderModel.findOne({ name: "Default Folder" });
  }
}
