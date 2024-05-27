import { FieldValues } from "react-hook-form";
import { Signature, SigType } from "../../../../../generated/graphqlOperations";
import useNotification from "../../../../global-notification/useNotification";
import useSignatures from "../../../system-data/useSignatures";
import useSystemData from "../../../system-data/useSystemData";

export type UseSigFormProps = {
  type: SigType;
  eveId: string;
  existing?: Signature;
  onClose: () => void;
};

const useSigForm = (props: UseSigFormProps) => {
  const { type, eveId, existing, onClose } = props;
  const { addSignatures, updateSignatures } = useSignatures();
  const { name: systemName } = useSystemData();
  const { showSuccessNotification } = useNotification();

  const submitNew = async (formData: FieldValues) => {
    const name = formData.name || "";
    const res = await addSignatures([
      { ...formData, type, eveId, name, systemName },
    ]);

    if (res.data && !res.errors) {
      showSuccessNotification("Signature added.");
      onClose();
    }
  };

  const submitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { name } = formData;
    const res = await updateSignatures([
      { name, type, eveId, id, systemName: name },
    ]);

    if (res.data && !res.errors) {
      showSuccessNotification("Signature updated.");
      onClose();
    }
  };

  const submitSigForm = existing ? submitEdit : submitNew;

  return {
    submitSigForm,
  };
};

export default useSigForm;
