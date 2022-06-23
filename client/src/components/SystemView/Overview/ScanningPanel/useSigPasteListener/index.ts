import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import createSigPasteBatch, { SigPasteBatch } from "./sigPasteBatch";
import parsePaste, { PastedSig } from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const systemData = useSystemData();
  const { addSignature, addWormhole, updateSignature, name: systemName } = systemData;

  const handlePastedSig = async (data: PastedSig) => {
    const { type, eveId, name } = data;
    const existingSig = systemData.signatures.find((sig) => sig.eveId === eveId);

    if (!existingSig) {
      const input = { type: type?.toUpperCase(), eveId, name };
      // return addSignature(input);
    }

    // Only scenarios when an _update_ is performed based on paste data.
    const sigExistsWihtoutTypeAndPasteHasType = existingSig && !existingSig.type && type;
    const sigExistsWithoutNameAndPasteHasName = existingSig && !existingSig.name && name;

    if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
      const { id } = existingSig;
      return updateSignature({ id, eveId, name, type });
    }

    return Promise.resolve();
  };

  const sigPasteListener = async (event: Event) => {
    let batch: SigPasteBatch;

    try {
      const asd = parsePaste(event as ClipboardEvent);
      console.log(asd);
      batch = createSigPasteBatch(asd, systemData.signatures, systemData.wormholes, systemName);
      console.log(batch);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    // TODO: Create batch mutations for these.
    await Promise.all(batch.signatureAdd.map((sig) => addSignature(sig)));
    await Promise.all(batch.wormholeAdd.map((wh) => addWormhole(wh)));
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
