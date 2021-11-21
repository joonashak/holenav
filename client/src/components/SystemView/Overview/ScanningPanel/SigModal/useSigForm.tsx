import { FieldValues } from "react-hook-form";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import { SigFormProps } from "./SigForm";

const useSigForm = (props: SigFormProps) => {
  const { type, eveId, existing, onClose } = props;
  const { addSignature, updateSignature } = useSystemData();
  const { showSuccessNotification } = useNotification();

  const submitNew = async (formData: FieldValues) => {
    const typeOrNull = type || null;
    const res = await addSignature({ ...formData, type: typeOrNull, eveId });

    if (res.data && !res.errors) {
      showSuccessNotification("Signature added.");
      onClose();
    }
  };

  const submitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const typeOrNull = type || null;
    const { name } = formData;
    const res = await updateSignature({ name, type: typeOrNull, eveId, id });

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
