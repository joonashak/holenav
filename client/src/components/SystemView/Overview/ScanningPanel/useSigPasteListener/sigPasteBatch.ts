import {
  AddWormholeInput,
  MassStatus,
  Signature,
  Wormhole,
} from "../../../../../generated/graphqlOperations";
import { AddSignatureHookInput } from "../../../SystemData/useSystemData";
import { PastedSig, SigPasteEvent } from "./sigPasteParser";

export type SigPasteBatch = {
  signatureAdd: AddSignatureHookInput[];
  signatureUpdate: Signature[];
  wormholeAdd: AddWormholeInput[];
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

const createWormholeAddReducer =
  (wormholes: Wormhole[], systemName: string) =>
  (addableWormholes: AddWormholeInput[], sig: PastedSig) => {
    const { eveId } = sig;
    const existingWh = wormholes.find((wh) => wh.eveId === eveId);

    // We are conservative when it comes to wormholes to not mess up the map; do nothing if EVE ID exists.
    if (!existingWh) {
      // FIXME: Nuke this mess.
      const newWormhole: AddWormholeInput = {
        eveId,
        name: "",
        type: "",
        destinationName: null,
        eol: false,
        massStatus: MassStatus.Stable,
        reverseType: "",
        systemName,
      };
      return addableWormholes.concat(newWormhole);
    }

    return addableWormholes;
  };

const createSigPasteBatch = (
  paste: SigPasteEvent,
  existingSignatures: Signature[],
  existingWormholes: Wormhole[],
  // TODO: Refactor this away. `addWormhole` should take care of filling it in.
  systemName: string
): SigPasteBatch => ({
  signatureAdd: paste.pastedSigs.reduce(createSignatureAddReducer(existingSignatures), []),
  signatureUpdate: [],
  wormholeAdd: paste.pastedWormholes.reduce(
    createWormholeAddReducer(existingWormholes, systemName),
    []
  ),
});

export default createSigPasteBatch;
