import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SystemService } from "../system/system.service";
import UpdateSignatureInput from "./dto/update-signature.dto";
import { Signature, SignatureDocument } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(Signature.name) private sigModel: Model<SignatureDocument>,
    private systemService: SystemService,
  ) {}

  async createSignatures(systemId: string, signatures: Signature[]): Promise<Signature[]> {
    const newSigs = await this.sigModel.create(signatures);
    await this.systemService.appendToSignatures(systemId, newSigs);
    return newSigs;
  }

  async updateSignature(id: string, update: Partial<UpdateSignatureInput>): Promise<Signature> {
    return this.sigModel.findOneAndUpdate({ id }, update, { returnDocument: "after" });
  }

  async deleteSignature(id: string): Promise<Signature> {
    return this.sigModel.findOneAndDelete({ id });
  }
}
