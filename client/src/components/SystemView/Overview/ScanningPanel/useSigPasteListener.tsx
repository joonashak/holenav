import SigTypes from "../../../../enum/SigTypes";
import useNotification from "../../../GlobalNotification/useNotification";
import useSystemData from "../../SystemData/useSystemData";

type PasteData = {
  eveId: string;
  type: SigTypes | null;
};

// TODO: Handle site name also.
const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const {
    signatures,
    wormholes,
    addSignature,
    addWormhole,
    updateSignature,
    updateWormhole,
    name: systemName,
  } = useSystemData();
  const allSigs = signatures.concat(wormholes);

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
    const rows = input.split(/\r?\n/).filter((row) => row.length);
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

  const handlePastedSig = async (data: PasteData) => {
    const { type, eveId } = data;
    const existingSigType = allSigs.find((sig) => sig.eveId === eveId)?.type || null;

    if (!existingSigType) {
      const input = { type: type?.toUpperCase(), eveId, name: "" };
      const whFields = {
        destinationName: null,
        eol: false,
        massStatus: "STABLE",
        reverseType: "",
        systemName,
      };
      return type === SigTypes.WORMHOLE
        ? addWormhole({ ...input, ...whFields })
        : addSignature(input);
    }

    return Promise.resolve();
  };

  const sigPasteListener = async (event: Event) => {
    let data: Array<PasteData> = [];

    try {
      data = getFormattedPasteData(event as ClipboardEvent);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    await Promise.all(data.map((sig) => handlePastedSig(sig)));
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
