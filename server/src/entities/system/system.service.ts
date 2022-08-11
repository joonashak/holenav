import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderDocument } from "../folder/folder.model";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>) {}

  async getByName(name: string, folder: FolderDocument): Promise<System> {
    const system = await this.systemModel.findOne({ name, folder });

    if (!system) {
      await this.systemModel.create({ name, folder });
      return this.getByName(name, folder);
    }

    return system;
  }
}
