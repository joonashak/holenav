import { createState, useState } from "@hookstate/core";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import parsePaste from "./sigPasteParser";

const sigPasteListenerDisabledState = createState(false);

const useSigPasteListener = () => {
  const sigPasteListenerDisabled = useState(sigPasteListenerDisabledState);
  const { showWarningNotification } = useNotification();
  const { pasteSignatures } = useSignatures();

  const sigPasteListener = async (event: Event) => {
    if (sigPasteListenerDisabled.get()) {
      return;
    }

    try {
      const pastedSigs = parsePaste(event as ClipboardEvent);
      await pasteSignatures(pastedSigs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
    }
  };

  const updateSigsFromClipboard = async (sync = false) => {
    const paste = await navigator.clipboard.readText();

    try {
      const pastedSigs = parsePaste(paste);
      await pasteSignatures(pastedSigs, sync);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
    }
  };

  const disableSigPasteListener = () => sigPasteListenerDisabled.set(true);
  const enableSigPasteListener = () => sigPasteListenerDisabled.set(false);

  return {
    sigPasteListener,
    updateSigsFromClipboard,
    disableSigPasteListener,
    enableSigPasteListener,
  };
};

export default useSigPasteListener;
