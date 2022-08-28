import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import createSigPasteBatch, { SigPasteBatch } from "./sigPasteBatch";
import parsePaste from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const { signatures, addSignatures, updateSignatures } = useSignatures();

  const sigPasteListener = async (event: Event) => {
    let batch: SigPasteBatch;

    try {
      const pasteEvent = parsePaste(event as ClipboardEvent);
      batch = createSigPasteBatch(pasteEvent, signatures);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    await addSignatures(batch.signatureAdd);
    await updateSignatures(batch.signatureUpdate);
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
