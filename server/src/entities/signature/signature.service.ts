import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../folder/folder.model";
import { SystemService } from "../system/system.service";
import { WormholeService } from "../wormhole/wormhole.service";
import UpdateSignatureInput from "./dto/update-signature.dto";
import { Signature, SignatureDocument } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(Signature.name) private sigModel: Model<SignatureDocument>,
    private systemService: SystemService,
    @Inject(forwardRef(() => WormholeService)) private wormholeService: WormholeService,
  ) {}

  async createSignatures(systemId: string, signatures: Signature[]): Promise<Signature[]> {
    const newSigs = await this.sigModel.create(signatures);
    await this.systemService.appendToSignatures(systemId, newSigs);
    return newSigs;
  }

  async updateSignature(id: string, update: Partial<UpdateSignatureInput>): Promise<Signature> {
    return this.sigModel.findOneAndUpdate({ id }, update, { returnDocument: "after" });
  }

  async updateSignatures(sigUpdates: UpdateSignatureInput[]): Promise<Signature[]> {
    return Promise.all(
      sigUpdates.map(async ({ id, ...update }) => this.updateSignature(id, update)),
    );
  }

  async deleteSignature(id: string): Promise<Signature> {
    return this.sigModel.findOneAndDelete({ id });
  }

  async deleteManySignaturesByEveId(
    eveIds: string[],
    systemName: string,
    folder: Folder,
  ): Promise<Signature[]> {
    const filter = {
      $and: [{ eveId: { $in: eveIds } }, { systemName }, { folder }],
    };

    const deleted = await this.sigModel.find(filter);
    await this.sigModel.deleteMany(filter);
    return deleted;
  }
}
