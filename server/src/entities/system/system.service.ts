import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Signature } from "../signature/signature.model";
import { MapTreeNode } from "./dto/system.dto";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>) {}

  async list() {
    return this.systemModel.find().exec();
  }

  async getByName(name: string): Promise<System> {
    const system = await this.systemModel.findOne({ name });
    const mapTree = await this.getMapTree(system);
    return { ...system.toObject(), mapTree };
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

  async getMapTree(system: SystemDocument): Promise<MapTreeNode[]> {
    const populatedSystem = await this.systemModel.populate(system, {
      path: "signatures",
      match: { type: "WH" }, // Quick fix only on this level, non-wh sigs elsewhere will still fail epicly.
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

    const reduceToConnections = (system: System) => {
      const { signatures } = system;

      const connections = signatures.map((sig) => ({
        name: sig.destination.name,
        children: reduceToConnections(sig.destination),
      }));

      return connections;
    };

    return reduceToConnections(populatedSystem);
  }
}
