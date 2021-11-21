import SigTypes from "../../../../enum/SigTypes";
import useNotification from "../../../GlobalNotification/useNotification";

type PasteData = {
  eveId: string;
  type: SigTypes | null;
};

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();

  const findSigType = (typeString: string) => {
    if (typeString === "Data Site") {
      return SigTypes.DATA;
    }
    if (typeString === "Relic Site") {
      return SigTypes.RELIC;
    }
    if (typeString.match(/Wormhole/)) {
      return SigTypes.WORMHOLE;
    }
    return null;
  };

  const getFormattedPasteData = (pasteEvent: ClipboardEvent): Array<PasteData> => {
    const input = pasteEvent.clipboardData?.getData("text") || "";
    const rows = input.split(/\r?\n/);
    const splitRows = rows.map((row) => row.split(/\t+/));

    const formattedData = splitRows.map((row) => {
      const eveId = row[0];
      if (!eveId.match(/^[A-Z]{3}-\d{3}$/)) {
        throw new Error("Bad paste data detected. No changes were made.");
      }

      const type = findSigType(row[1]);
      return { eveId, type };
    });

    return formattedData;
  };

  const sigPasteListener = (event: Event) => {
    let data: Array<PasteData> = [];

    try {
      data = getFormattedPasteData(event as ClipboardEvent);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    console.log("data", data);
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
