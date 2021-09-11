import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SystemService } from "../system/system.service";
import { Signature, SignatureDocument } from "./signature.model";
import SigTypes from "./sigTypes.enum";

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

  async createConnection(
    systemId: string,
    destinationId: string,
    signature: Signature,
  ): Promise<Signature> {
    const newSig = await this.createSignature(systemId, signature);
    const updated = await this.createReverseConnection(destinationId, systemId, newSig);
    return updated;
  }

  private async createReverseConnection(
    destinationId: string,
    originId: string,
    originSig: Signature,
  ): Promise<Signature> {
    const origin = await this.systemService.getById(originId);

    const reverse = await this.createSignature(destinationId, {
      type: SigTypes.WORMHOLE,
      name: origin.name,
      destination: origin,
      reverse: originSig,
    });
    this.systemService.appendToSignatures(destinationId, reverse);

    const destination = await this.systemService.getById(destinationId);
    const updated = await this.sigModel.findOneAndUpdate(
      { id: originSig.id },
      { destination, reverse },
    );

    return updated;
  }
}
