import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderDocument } from "../folder/folder.model";
import { Signature } from "../signature/signature.model";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>) {}

  async getById(id: string): Promise<System> {
    const system = await this.systemModel.findOne({ id });
    return system;
  }

  async getByName(name: string, folder: FolderDocument): Promise<System> {
    const system = await this.systemModel.findOne({ name, folder }).populate("signatures");
    return { ...system.toObject() };
  }

  async bulkSave(systems: Partial<System>[]) {
    const ops = systems.map((system) => ({
      insertOne: {
        document: system,
      },
    }));

    return this.systemModel.bulkWrite(ops);
  }

  async appendToSignatures(systemId: string, signature: Signature) {
    await this.systemModel.findOneAndUpdate({ id: systemId }, { $push: { signatures: signature } });
  }
}
