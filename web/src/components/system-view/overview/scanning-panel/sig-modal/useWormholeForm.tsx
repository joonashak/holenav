import { omit } from "lodash";
import { FieldValues } from "react-hook-form";
import { Signature, SigType } from "../../../../../generated/graphqlOperations";
import useNotification from "../../../../global-notification/useNotification";
import useSignatures from "../../../system-data/useSignatures";
import useSystemData from "../../../system-data/useSystemData";

export type UseWormholeFormProps = {
  eveId: string;
  existing?: Signature;
  onClose: () => void;
};

const useWormholeForm = (props: UseWormholeFormProps) => {
  const { eveId, existing, onClose } = props;
  const { name: systemName } = useSystemData();
  const { showSuccessNotification } = useNotification();
  const { createSignatures, updateSignatures } = useSignatures();

  const submitNew = async (formData: FieldValues) => {
    const {
      whType: fwd,
      whReverseType: rev,
      life,
      mass,
      name,
      destinationName,
    } = formData;

    const k162 = fwd === "K162" || (!!rev && rev !== "K162");
    const _type = !k162 ? fwd : rev;
    const type = _type || null;

    const res = await createSignatures([
      {
        eveId,
        name,
        systemName,
        type: SigType.Wormhole,
        connection: {
          eol: life === "eol",
          massStatus: mass,
          from: systemName,
          to: destinationName || undefined,
          type,
          k162,
        },
      },
    ]);

    if (res.data && !res.errors) {
      showSuccessNotification("Wormhole added.");
      onClose();
    }
  };

  const submitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { whType, whReverseType, life, mass, name, destinationName } =
      formData;

    // Add missing fields when updating non-WH sig into WH.
    const reverseSignature = existing?.connection
      ? omit(existing?.connection?.reverseSignature, ["__typename"])
      : {
          eveId: "",
          type: SigType.Wormhole,
          name: "",
          id: "",
        };

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
          ...reverseSignature,
          systemName: destinationName || "",
          wormholeType: whReverseType,
        },
      },
    };

    const res = await updateSignatures([mutationData]);

    if (res.data && !res.errors) {
      // fetchConnectionTree();
      showSuccessNotification("Wormhole updated.");
      onClose();
    }
  };

  const submitWormholeForm = existing ? submitEdit : submitNew;

  return { submitWormholeForm };
};

export default useWormholeForm;
