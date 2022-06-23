import {
  AddWormholeInput,
  MassStatus,
  Signature,
  Wormhole,
} from "../../../../../generated/graphqlOperations";
import { PastedSig, SigPasteEvent } from "./sigPasteParser";

export type SigPasteBatch = {
  signatureAdd: Signature[];
  signatureUpdate: Signature[];
  wormholeAdd: AddWormholeInput[];
};

const createWormholeAddReducer =
  (wormholes: Wormhole[], systemName: string) =>
  (addableWormholes: AddWormholeInput[], sig: PastedSig) => {
    const { eveId } = sig;
    const existingWh = wormholes.find((wh) => wh.eveId === eveId);

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
  systemName: string
): SigPasteBatch => ({
  signatureAdd: [],
  signatureUpdate: [],
  wormholeAdd: paste.pastedWormholes.reduce(
    createWormholeAddReducer(existingWormholes, systemName),
    []
  ),
});

export default createSigPasteBatch;
