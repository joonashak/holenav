import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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

  async getConnectionGraph(): Promise<Signature> {
    const res = await this.systemModel.aggregate([
      { $match: { _id: Types.ObjectId("612e8138ec201f0102b2c9f4") } },
      {
        $graphLookup: {
          from: "systems",
          startWith: "$_id",
          connectFromField: "signatures.destination",
          connectToField: "_id",
          maxDepth: 5,
          as: "connections",
        },
      },
    ]);
    //console.log(res[0].connections);

    const res2 = await this.systemModel.findOne({ name: "Jita" }).populate({
      path: "signatures",
      populate: {
        path: "destination",
        populate: {
          path: "signatures",
          populate: {
            path: "destination",
            populate: { path: "signatures", populate: { path: "destination" } },
          },
        },
      },
    });
    console.log(res2.signatures[0]);
    console.log(res2.signatures[1]);
    console.log(res2.signatures[0].destination.signatures[0].destination.signatures[0]);
    return null;
  }
}
