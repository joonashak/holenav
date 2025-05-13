import { create } from "zustand";
import useNotification from "../../../../global-notification/useNotification";
import useSignatures from "../../../system-data/useSignatures";
import parsePaste from "./sigPasteParser";

const useStore = create<{
  sigPasteListenerEnabled: boolean;
  disableSigPasteListener: () => void;
  enableSigPasteListener: () => void;
}>((set) => ({
  sigPasteListenerEnabled: true,
  disableSigPasteListener: () => set({ sigPasteListenerEnabled: false }),
  enableSigPasteListener: () => set({ sigPasteListenerEnabled: true }),
}));

const useSigPasteListener = () => {
  const { disableSigPasteListener, enableSigPasteListener } = useStore();

  const { showWarningNotification } = useNotification();
  const { pasteSignatures } = useSignatures();

  const sigPasteListener = async (event: Event) => {
    const { sigPasteListenerEnabled } = useStore.getState();

    if (!sigPasteListenerEnabled) {
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

  return {
    sigPasteListener,
    updateSigsFromClipboard,
    disableSigPasteListener,
    enableSigPasteListener,
  };
};

export default useSigPasteListener;
