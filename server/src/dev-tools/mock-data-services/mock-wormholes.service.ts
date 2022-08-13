import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderService } from "../../entities/folder/folder.service";
import SigType from "../../entities/signature/sig-type.enum";
import { Signature } from "../../entities/signature/signature.model";
import { SignatureService } from "../../entities/signature/signature.service";
import MassStatus from "../../entities/wormhole/mass-status.enum";
import whMockData from "../data/wormholes";

@Injectable()
export class MockWormholeService {
  constructor(
    @InjectModel(Signature.name) private sigModel: Model<Signature>,
    private folderService: FolderService,
    private sigService: SignatureService,
  ) {}

  async mock() {
    await this.sigModel.deleteMany({});
    const folder = await this.folderService.getDefaultFolder();

    const sigs = whMockData.map((wh) => ({
      eveId: "",
      type: SigType.WORMHOLE,
      eol: false,
      massStatus: MassStatus.STABLE,
      wormholeType: "",
      reverseType: "",
      folder,
      ...wh,
    }));

    await this.sigService.createSignatures(sigs);
  }
}