import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderDocument } from "../folder/folder.model";
import { Signature } from "../signature/signature.model";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>) {}

  async getByName(name: string, folder: FolderDocument): Promise<System> {
    const system = await this.systemModel.findOne({ name, folder }).populate("signatures");

    if (!system) {
      await this.systemModel.create({ name, folder });
      return this.getByName(name, folder);
    }

    return system;
  }

  // FIXME: This will probably have to be changed to use name+folder combination instead of id
  // because we cannot create a missing system without the system name.
  // EDIT: On the other hand, probably only wormholes need to be added without the system document
  // being already initialized...
  async appendToSignatures(systemId: string, signatures: Signature[]) {
    await this.systemModel.findOneAndUpdate({ id: systemId }, { $push: { signatures } });
  }
}
