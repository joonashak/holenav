import { omit } from "lodash";
import { FieldValues } from "react-hook-form";
import { Signature, SigType } from "../../../../../generated/graphqlOperations";
import useNotification from "../../../../GlobalNotification/useNotification";
import useMapData from "../../../Map/MapData/useMapData";
import useSignatures from "../../../SystemData/useSignatures";
import useSystemData from "../../../SystemData/useSystemData";

export type UseWormholeFormProps = {
  eveId: string;
  existing?: Signature;
  onClose: () => void;
};

const useWormholeForm = (props: UseWormholeFormProps) => {
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
      wormholeType: whType,
      connection: {
        eol: life === "eol",
        massStatus: mass,
        reverseSignature: {
          eveId: "",
          name: "",
          systemName: destinationName || "",
          type: SigType.Wormhole,
          wormholeType: whReverseType,
        },
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
      ...omit(existing, ["__typename"]),
      id,
      eveId,
      type: SigType.Wormhole,
      wormholeType: whType,
      name,
      connection: {
        ...omit(existing?.connection, ["__typename"]),
        eol: life === "eol",
        massStatus: mass,
        reverseSignature: {
          ...omit(existing?.connection?.reverseSignature, ["__typename"]),
          systemName: destinationName || "",
          wormholeType: whReverseType,
        },
      },
    };

    const res = await updateSignatures([mutationData]);

    if (res.data && !res.errors) {
      fetchConnectionTree();
      showSuccessNotification("Wormhole updated.");
      onClose();
    }
  };

  const submitWormholeForm = existing ? submitEdit : submitNew;

  return { submitWormholeForm };
};

export default useWormholeForm;
