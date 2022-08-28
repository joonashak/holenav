import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderService } from "../../entities/folder/folder.service";
import SigType from "../../entities/signature/enums/sig-type.enum";
import { SignatureOLD } from "../../entities/signature/signature-OLD.model";
import { SignatureService } from "../../entities/signature/services/signature.service";
import MassStatus from "../../entities/signature/enums/mass-status.enum";
import whMockData from "../data/wormholes-OLD";

@Injectable()
export class MockWormholeService {
  constructor(
    @InjectModel(SignatureOLD.name) private sigModel: Model<SignatureOLD>,
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

    //await this.sigService.createSignatures(sigs);
  }
}
