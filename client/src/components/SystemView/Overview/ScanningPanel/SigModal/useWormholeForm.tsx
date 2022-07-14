import { FieldValues } from "react-hook-form";
import useNotification from "../../../../GlobalNotification/useNotification";
import useMapData from "../../../Map/MapData/useMapData";
import useSystemData from "../../../SystemData/useSystemData";
import useWormholes from "../../../SystemData/useWormholes";
import { WormholeFormProps } from "./WormholeForm";

const useWormholeForm = (props: WormholeFormProps) => {
  const { eveId, existing, onClose } = props;
  const { name: systemName } = useSystemData();
  const { addWormhole, updateWormhole } = useWormholes();
  const { fetchConnectionTree } = useMapData();
  const { showSuccessNotification } = useNotification();

  const submitNew = async (formData: FieldValues) => {
    const { whType, whReverseType, life, mass, ...data } = formData;
    const mutationData = {
      eveId,
      systemName,
      type: whType,
      reverseType: whReverseType,
      eol: life === "eol",
      massStatus: mass,
      ...data,
    };
    const res = await addWormhole(mutationData);

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
      type: whType,
      reverseType: whReverseType,
      eol: life === "eol",
      massStatus: mass,
      name,
      destinationName,
    };
    const res = await updateWormhole(mutationData);

    if (res.data && !res.errors) {
      showSuccessNotification("Wormhole updated.");
      onClose();
    }
  };

  const submitWormholeForm = existing ? submitEdit : submitNew;

  return { submitWormholeForm };
};

export default useWormholeForm;
