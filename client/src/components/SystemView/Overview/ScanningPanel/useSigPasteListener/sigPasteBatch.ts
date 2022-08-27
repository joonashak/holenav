import { SignatureOld } from "../../../../../generated/graphqlOperations";
import { AddSignatureHookInput } from "../../../SystemData/useSignatures";

import { PastedSig, SigPasteEvent } from "./sigPasteParser";

export type SigPasteBatch = {
  signatureAdd: AddSignatureHookInput[];
  signatureUpdate: SignatureOld[];
};

const createSignatureAddReducer =
  (signatures: SignatureOld[]) => (addableSignatures: AddSignatureHookInput[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = signatures.find((s) => s.eveId === eveId);

    if (!existingSig) {
      const newSignature = { type, eveId, name };
      return addableSignatures.concat([newSignature]);
    }

    return addableSignatures;
  };

const createSignatureUpdateReducer =
  (signatures: SignatureOld[]) => (sigUpdates: SignatureOld[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = signatures.find((s) => s.eveId === eveId);

    // Only scenarios when an update is performed based on paste data.
    const sigExistsWihtoutTypeAndPasteHasType = existingSig && !existingSig.type && type;
    const sigExistsWithoutNameAndPasteHasName = existingSig && !existingSig.name && name;

    if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
      return sigUpdates.concat({ ...existingSig, eveId, name, type });
    }

    return sigUpdates;
  };

const createSigPasteBatch = (
  paste: SigPasteEvent,
  existingSignatures: SignatureOld[]
): SigPasteBatch => ({
  signatureAdd: paste.pastedSigs.reduce(createSignatureAddReducer(existingSignatures), []),
  signatureUpdate: paste.pastedSigs.reduce(createSignatureUpdateReducer(existingSignatures), []),
});

export default createSigPasteBatch;
