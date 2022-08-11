import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder } from "../folder/folder.model";
import { SystemService } from "../system/system.service";
import { Wormhole } from "../wormhole/wormhole.model";
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

  /**
   * Remove signatures that have a duplicate ID with any given wormhole. Only affects sigs in
   * the current system and folder.
   */
  async removeDuplicateSignatures(wormholes: Wormhole[]): Promise<Signature[]> {
    const whEveIds = wormholes.map((wh) => wh.eveId).filter((id) => !!id);
    return this.deleteManySignaturesByEveId(whEveIds, wormholes[0].systemName, wormholes[0].folder);
  }
}
