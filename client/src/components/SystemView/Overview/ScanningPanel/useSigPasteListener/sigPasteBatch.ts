import { CreatableSignature, Signature } from "../../../../../generated/graphqlOperations";
import { findSigByEveId } from "../../../../../utils/findSigByEveId";

import { PastedSig } from "./sigPasteParser";

export type SigPasteBatch = {
  signatureAdd: CreatableSignature[];
  signatureUpdate: Signature[];
};

const createSignatureAddReducer =
  (signatures: Signature[]) => (addableSignatures: CreatableSignature[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = findSigByEveId(eveId, signatures);

    if (!existingSig) {
      const newSignature = { type, eveId, name, systemName: "" };
      return addableSignatures.concat([newSignature]);
    }

    return addableSignatures;
  };

const createSignatureUpdateReducer =
  (signatures: Signature[]) => (sigUpdates: Signature[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = findSigByEveId(eveId, signatures);

    // Only scenarios when an update is performed based on paste data.
    const sigExistsWihtoutTypeAndPasteHasType = existingSig && !existingSig.type && type;
    const sigExistsWithoutNameAndPasteHasName = existingSig && !existingSig.name && name;

    if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
      return sigUpdates.concat({ ...existingSig, eveId, name, type });
    }

    return sigUpdates;
  };

const createSigPasteBatch = (
  paste: PastedSig[],
  existingSignatures: Signature[]
): SigPasteBatch => ({
  signatureAdd: paste.reduce(createSignatureAddReducer(existingSignatures), []),
  signatureUpdate: paste.reduce(createSignatureUpdateReducer(existingSignatures), []),
});

export default createSigPasteBatch;
