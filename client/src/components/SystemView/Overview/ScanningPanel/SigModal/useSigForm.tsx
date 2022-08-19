import { FieldValues } from "react-hook-form";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";
import { SigFormProps } from "./SigForm";

const useSigForm = (props: SigFormProps) => {
  const { type, eveId, existing, onClose } = props;
  const { addSignatures: addSignature, updateSignature } = useSignatures();
  const { showSuccessNotification } = useNotification();

  const submitNew = async (formData: FieldValues) => {
    const name = formData.name || "";
    const res = await addSignature([{ ...formData, type, eveId, name }]);

    if (res.data && !res.errors) {
      showSuccessNotification("Signature added.");
      onClose();
    }
  };

  const submitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { name } = formData;
    const res = await updateSignature({ name, type, eveId, id });

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
