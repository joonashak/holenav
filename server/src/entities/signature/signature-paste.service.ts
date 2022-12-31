import { Injectable } from "@nestjs/common";
import { Folder } from "../folder/folder.model";
import { SignaturePaste } from "./dto/paste-signatures.dto";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@Injectable()
export class SignaturePasteService {
  constructor(private signatureService: SignatureService) {}

  async applySignaturePaste(paste: SignaturePaste, folder: Folder): Promise<Signature[]> {
    const existingSigs = await this.signatureService.getBySystem(paste.systemName, folder);
    const addableSigs = this.getAddableSigs(paste, existingSigs);
    return this.signatureService.createSignatures(addableSigs, folder);
  }

  private getAddableSigs(paste: SignaturePaste, existing: Signature[]) {
    const existingEveIds = existing.map((sig) => sig.eveId);

    const addableSigs = paste.pastedSignatures
      .filter((pastedSig) => !existingEveIds.includes(pastedSig.eveId))
      .map((pastedSig) => ({ ...pastedSig, systemName: paste.systemName }));

    return addableSigs;
  }
}
