import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import createSigPasteBatch, { SigPasteBatch } from "./sigPasteBatch";
import parsePaste from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const systemData = useSystemData();
  const { addSignature, addWormhole, updateSignature, name: systemName } = systemData;

  const sigPasteListener = async (event: Event) => {
    let batch: SigPasteBatch;

    try {
      const pasteEvent = parsePaste(event as ClipboardEvent);
      batch = createSigPasteBatch(
        pasteEvent,
        systemData.signatures,
        systemData.wormholes,
        systemName
      );
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
