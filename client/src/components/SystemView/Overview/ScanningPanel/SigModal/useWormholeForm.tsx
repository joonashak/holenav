import { FieldValues } from "react-hook-form";
import { SignatureOld, SigType } from "../../../../../generated/graphqlOperations";
import useNotification from "../../../../GlobalNotification/useNotification";
import useMapData from "../../../Map/MapData/useMapData";
import useSignatures from "../../../SystemData/useSignatures";
import useSystemData from "../../../SystemData/useSystemData";
import { WormholeFormProps } from "./WormholeForm";

const useWormholeForm = (props: WormholeFormProps) => {
  const { eveId, existing, onClose } = props;
  const { name: systemName } = useSystemData();
  const { fetchConnectionTree } = useMapData();
  const { showSuccessNotification } = useNotification();
  const { addSignatures, updateSignatures } = useSignatures();

  const submitNew = async (formData: FieldValues) => {
    const { whType, whReverseType, life, mass, name, destinationName } = formData;
    const mutationData = {
      eveId,
      systemName,
      type: SigType.Wormhole,
      name,
      connection: {
        wormholeType: whType,
        reverseType: whReverseType,
        eol: life === "eol",
        massStatus: mass,
        destinationName: destinationName || "",
        unknownDestination: !destinationName,
      },
    };

    const res = await addSignatures([mutationData]);

    if (res.data && !res.errors) {
      fetchConnectionTree();
      showSuccessNotification("Wormhole added.");
      onClose();
    }
  };

  const submitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { whType, whReverseType, life, mass, name, destinationName } = formData;
    const mutationData = {
      id,
      eveId,
      type: SigType.Wormhole,
      wormholeType: whType,
      reverseType: whReverseType,
      eol: life === "eol",
      massStatus: mass,
      name,
      destinationName,
    };

    const res = await updateSignatures([mutationData as SignatureOld]);

    if (res.data && !res.errors) {
      showSuccessNotification("Wormhole updated.");
      onClose();
    }
  };

  const submitWormholeForm = existing ? submitEdit : submitNew;

  return { submitWormholeForm };
};

export default useWormholeForm;
