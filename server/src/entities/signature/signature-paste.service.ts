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
    const addedSigs = await this.signatureService.createSignatures(addableSigs, folder);

    const updateableSigs = this.getUpdateableSigs(paste, existingSigs);
    const updatedSigs = await this.signatureService.updateSignatures(updateableSigs, folder);

    return addedSigs.concat(updatedSigs);
  }

  private getAddableSigs(paste: SignaturePaste, existing: Signature[]) {
    const existingEveIds = existing.map((sig) => sig.eveId);

    const addableSigs = paste.pastedSignatures
      .filter((pastedSig) => !existingEveIds.includes(pastedSig.eveId))
      .map((pastedSig) => ({ ...pastedSig, systemName: paste.systemName }));

    return addableSigs;
  }

  private getUpdateableSigs(paste: SignaturePaste, existing: Signature[]) {
    return paste.pastedSignatures.reduce((updateableSigs, pastedSig) => {
      const existingSig = existing.find((sig) => sig.eveId === pastedSig.eveId);

      // The only scenarios when an update is performed based on paste data.
      const sigExistsWihtoutTypeAndPasteHasType =
        existingSig && !existingSig.type && pastedSig.type;
      const sigExistsWithoutNameAndPasteHasName =
        existingSig && !existingSig.name && pastedSig.name;

      if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
        return updateableSigs.concat({
          ...existingSig,
          type: pastedSig.type,
          name: pastedSig.name,
          systemName: paste.systemName,
        });
      }

      return updateableSigs;
    }, []);
  }
}
