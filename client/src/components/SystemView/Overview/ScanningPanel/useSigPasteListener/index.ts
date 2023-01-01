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

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
