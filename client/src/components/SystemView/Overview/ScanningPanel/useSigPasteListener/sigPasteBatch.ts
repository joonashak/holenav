import { Signature } from "../../../../../generated/graphqlOperations";
import { AddSignatureHookInput } from "../../../SystemData/useSystemData";
import { PastedSig, SigPasteEvent } from "./sigPasteParser";

export type SigPasteBatch = {
  signatureAdd: AddSignatureHookInput[];
  signatureUpdate: Signature[];
};

const createSignatureAddReducer =
  (signatures: Signature[]) => (addableSignatures: AddSignatureHookInput[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = signatures.find((s) => s.eveId === eveId);

    if (!existingSig) {
      const newSignature = { type, eveId, name };
      return addableSignatures.concat(newSignature);
    }

    return addableSignatures;
  };

const createSignatureUpdateReducer =
  (signatures: Signature[]) => (sigUpdates: Signature[], sig: PastedSig) => {
    const { type, eveId, name } = sig;
    const existingSig = signatures.find((s) => s.eveId === eveId);

    // Only scenarios when an update is performed based on paste data.
    const sigExistsWihtoutTypeAndPasteHasType = existingSig && !existingSig.type && type;
    const sigExistsWithoutNameAndPasteHasName = existingSig && !existingSig.name && name;

    if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
      const { id } = existingSig;
      return sigUpdates.concat({ id, eveId, name, type });
    }

    return sigUpdates;
  };

const createSigPasteBatch = (
  paste: SigPasteEvent,
  existingSignatures: Signature[]
): SigPasteBatch => ({
  signatureAdd: paste.pastedSigs.reduce(createSignatureAddReducer(existingSignatures), []),
  signatureUpdate: paste.pastedSigs.reduce(createSignatureUpdateReducer(existingSignatures), []),
});

export default createSigPasteBatch;
