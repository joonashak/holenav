import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import parsePaste from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const { pasteSignatures } = useSignatures();

  const sigPasteListener = async (event: Event) => {
    try {
      const pastedSigs = parsePaste(event as ClipboardEvent);
      await pasteSignatures(pastedSigs);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
    }
  };

  const updateSigsFromClipboard = async (sync = false) => {
    const paste = await navigator.clipboard.readText();

    try {
      const pastedSigs = parsePaste(paste);
      await pasteSignatures(pastedSigs, sync);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
    }
  };

  return {
    sigPasteListener,
    updateSigsFromClipboard,
  };
};

export default useSigPasteListener;
