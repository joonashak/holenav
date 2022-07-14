import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import useSystemData from "../../../SystemData/useSystemData";
import useWormholes from "../../../SystemData/useWormholes";
import createSigPasteBatch, { SigPasteBatch } from "./sigPasteBatch";
import parsePaste from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const { name: systemName } = useSystemData();
  const { signatures, addSignature, updateSignature } = useSignatures();
  const { wormholes, addWormhole } = useWormholes();

  const sigPasteListener = async (event: Event) => {
    let batch: SigPasteBatch;

    try {
      const pasteEvent = parsePaste(event as ClipboardEvent);
      batch = createSigPasteBatch(pasteEvent, signatures, wormholes, systemName);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    // TODO: Create batch mutations for these.
    await Promise.all(batch.signatureAdd.map(addSignature));
    await Promise.all(batch.signatureUpdate.map(updateSignature));
    await Promise.all(batch.wormholeAdd.map(addWormhole));
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
