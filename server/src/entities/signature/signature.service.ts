import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SystemService } from "../system/system.service";
import { Signature, SignatureDocument } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(Signature.name) private sigModel: Model<SignatureDocument>,
    private systemService: SystemService,
  ) {}

  async createSignature(systemId: string, signature: Signature): Promise<Signature> {
    const newSig = await this.sigModel.create(signature);
    await this.systemService.appendToSignatures(systemId, newSig);
    return newSig;
  }
}
