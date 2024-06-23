import { Injectable } from "@nestjs/common";
import {
  SignaturePaste,
  SignaturePasteResult,
} from "./dto/paste-signatures.dto";
import SigType from "./enums/sig-type.enum";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@Injectable()
export class SignaturePasteService {
  constructor(private signatureService: SignatureService) {}

  async applySignaturePaste(
    paste: SignaturePaste,
    folderId: string,
  ): Promise<SignaturePasteResult> {
    const existingSigs = await this.signatureService.getBySystem(
      paste.systemName,
      folderId,
    );

    const addableSigs = this.getAddableSigs(paste, existingSigs);
    const added = await this.signatureService.createSignatures(
      addableSigs,
      folderId,
    );

    const updateableSigs = this.getUpdateableSigs(paste, existingSigs);
    const updated = await this.signatureService.updateSignatures(
      updateableSigs,
      folderId,
    );

    const deletableSigs = this.getDeletableSigs(paste, existingSigs);
    const deleted = await this.signatureService.deleteSignatures(deletableSigs);

    return { added, updated, deleted };
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

      if (!existingSig) {
        return updateableSigs;
      }

      const existingUknown = existingSig.type === SigType.UNKNOWN;
      const pastedUnkown = pastedSig.type === SigType.UNKNOWN;
      // The only scenarios when an update is performed based on paste data.
      const sigExistsWihtoutTypeAndPasteHasType =
        existingSig && existingUknown && !pastedUnkown;
      const sigExistsWithoutNameAndPasteHasName =
        existingSig && !existingSig.name && pastedSig.name;

      if (
        sigExistsWihtoutTypeAndPasteHasType ||
        sigExistsWithoutNameAndPasteHasName
      ) {
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

  private getDeletableSigs(paste: SignaturePaste, existing: Signature[]) {
    if (!paste.deleteMissingSigs) {
      return [];
    }

    const pastedEveIds = paste.pastedSignatures.map((sig) => sig.eveId);
    const deletableSigs = existing.filter(
      (sig) => !pastedEveIds.includes(sig.eveId),
    );
    return deletableSigs.map((sig) => sig.id);
  }
}
