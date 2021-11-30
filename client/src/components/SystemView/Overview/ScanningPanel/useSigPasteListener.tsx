import SigTypes from "../../../../enum/SigTypes";
import useNotification from "../../../GlobalNotification/useNotification";
import useSystemData from "../../SystemData/useSystemData";

type PasteData = {
  eveId: string;
  type: SigTypes | null;
  name: string;
};

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const systemData = useSystemData();
  const { addSignature, addWormhole, updateSignature, name: systemName } = systemData;

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
    // eslint-disable-next-line
    console.log("rows", rows);
    const splitRows = rows.map((row) => row.split(/\t/));
    // eslint-disable-next-line
    console.log("split rows", splitRows);

    const formattedData = splitRows.map((row) => {
      const eveId = row[0];
      if (!eveId.match(/^[A-Z]{3}-\d{3}$/)) {
        throw new Error("Bad paste data detected. No changes were made.");
      }

      const type = findSigType(row[2]);
      const name = row[3];
      return { eveId, type, name };
    });

    return formattedData;
  };

  const handlePastedSig = async (data: PasteData) => {
    const { type, eveId, name } = data;
    const existingSig = systemData.signatures.find((sig) => sig.eveId === eveId);

    if (!existingSig) {
      const input = { type: type?.toUpperCase(), eveId, name };
      return addSignature(input);
    }

    // Only scenarios when an _update_ is performed based on paste data.
    const sigExistsWihtoutTypeAndPasteHasType = existingSig && !existingSig.type && type;
    const sigExistsWithoutNameAndPasteHasName = existingSig && !existingSig.name && name;

    if (sigExistsWihtoutTypeAndPasteHasType || sigExistsWithoutNameAndPasteHasName) {
      const { id } = existingSig;
      return updateSignature({ id, eveId, name, type: type?.toUpperCase() || "" });
    }

    return Promise.resolve();
  };

  const handlePastedWh = async (data: PasteData) => {
    const { eveId } = data;
    const existingWh = systemData.wormholes.find((sig) => sig.eveId === eveId);

    if (!existingWh) {
      const input = {
        eveId,
        name: "",
        type: "",
        destinationName: null,
        eol: false,
        massStatus: "STABLE",
        reverseType: "",
        systemName,
      };
      return addWormhole(input);
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

    await Promise.all(
      data.map((sig) =>
        sig.type === SigTypes.WORMHOLE ? handlePastedWh(sig) : handlePastedSig(sig)
      )
    );
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
