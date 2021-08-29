import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Signature } from "../signature/signature.model";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>) {}

  async list() {
    return this.systemModel.find().exec();
  }

  async getByName(name: string) {
    return this.systemModel.findOne({ name }).populate("signatures");
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
