import { SigTypes } from "../../../../../generated/graphqlOperations";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import parsePaste, { SigPasteItem } from "./sigPasteParser";

const useSigPasteListener = () => {
  const { showWarningNotification } = useNotification();
  const systemData = useSystemData();
  const { addSignature, addWormhole, updateSignature, name: systemName } = systemData;

  const handlePastedSig = async (data: SigPasteItem) => {
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
      return updateSignature({ id, eveId, name, type });
    }

    return Promise.resolve();
  };

  const handlePastedWh = async (data: SigPasteItem) => {
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
    let data: Array<SigPasteItem> = [];

    try {
      data = parsePaste(event as ClipboardEvent);
    } catch (error: any) {
      showWarningNotification(error.message, { autoHide: true });
      return;
    }

    await Promise.all(
      data.map((sig) =>
        sig.type === SigTypes.Wormhole ? handlePastedWh(sig) : handlePastedSig(sig)
      )
    );
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
