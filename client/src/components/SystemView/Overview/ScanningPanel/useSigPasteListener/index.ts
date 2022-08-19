import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import createSigPasteBatch, { SigPasteBatch } from "./sigPasteBatch";
import parsePaste from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const { signatures, addSignatures: addSignature, updateSignature } = useSignatures();

  const sigPasteListener = async (event: Event) => {
    let batch: SigPasteBatch;

    try {
      const pasteEvent = parsePaste(event as ClipboardEvent);
      batch = createSigPasteBatch(pasteEvent, signatures);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    // TODO: Create batch mutations for these.
    await addSignature(batch.signatureAdd);
    await Promise.all(batch.signatureUpdate.map(updateSignature));
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
