import { Injectable } from "@nestjs/common";
import { FindSignature } from "./dto/find-signature.dto";
import {
  SignaturePaste,
  SignaturePasteResult,
} from "./dto/paste-signatures.dto";
import SigType from "./enums/sig-type.enum";
import { SignatureService } from "./signature.service";

@Injectable()
export class SignaturePasteService {
  constructor(private signatureService: SignatureService) {}

  async applySignaturePaste(
    paste: SignaturePaste,
    folderId: string,
  ): Promise<SignaturePasteResult> {
    const existingSigs = await this.signatureService.findBySystem(
      paste.systemName,
      folderId,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addableSigs = this.getAddableSigs(paste, existingSigs);
    // FIXME:
    // const added = await this.signatureService.createSignatures([]);
    const added = [];

    const updateableSigs = this.getUpdateableSigs(paste, existingSigs);
    const updated = await this.signatureService.updateSignatures(
      updateableSigs,
      folderId,
    );

    const deletableSigs = this.getDeletableSigs(paste, existingSigs);
    const deleted = await this.signatureService.deleteSignatures(
      deletableSigs,
      folderId,
    );

    return { added, updated, deleted };
  }

  private getAddableSigs(paste: SignaturePaste, existing: FindSignature[]) {
    const existingEveIds = existing.map((sig) => sig.eveId);

    const addableSigs = paste.pastedSignatures
      .filter((pastedSig) => !existingEveIds.includes(pastedSig.eveId))
      .map((pastedSig) => ({ ...pastedSig, systemName: paste.systemName }));

    return addableSigs;
  }

  private getUpdateableSigs(paste: SignaturePaste, existing: FindSignature[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return paste.pastedSignatures.reduce((updateableSigs: any[], pastedSig) => {
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

  private getDeletableSigs(paste: SignaturePaste, existing: FindSignature[]) {
    if (!paste.deleteMissingSigs) {
      return [];
    }

    const pastedEveIds = paste.pastedSignatures.map((sig) => sig.eveId);
    const deletableSigs = existing.filter(
      (sig) => !pastedEveIds.includes(sig.eveId || ""),
    );
    return deletableSigs.map((sig) => sig.id);
  }
}
