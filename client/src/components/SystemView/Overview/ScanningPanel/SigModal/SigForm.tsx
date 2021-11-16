import { Box, Button, FormGroup } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import { Signature } from "../../../SystemData/types";

type SigFormProps = {
  type: SigTypes;
  eveId: string;
  existing?: Signature;
};

const SigForm = ({ type, eveId, existing }: SigFormProps) => {
  const { handleSubmit, control } = useForm({ defaultValues: { name: existing?.name || "" } });
  const { addSignature, updateSignature } = useSystemData();
  const { setNotification } = useNotification();

  const onSubmitNew = async (formData: any) => {
    const res = await addSignature({ ...formData, type, eveId });

    if (res.data && !res.errors) {
      setNotification("Signature added.", "success", true);
    }
  };

  const onSubmitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { name } = formData;
    const res = await updateSignature({ name, type, eveId, id });

    if (res.data && !res.errors) {
      setNotification("Signature updated.", "success", true);
    }
  };

  const onSubmit = existing ? onSubmitEdit : onSubmitNew;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ "& > *": { mt: 3, mb: 3 } }}>
        <FormGroup>
          <ControlledTextField name="name" control={control} label="Name" />
        </FormGroup>
        <FormGroup>
          <Button type="submit" variant="contained" color="secondary" data-cy="sig-form-submit">
            Save Signature
          </Button>
        </FormGroup>
      </Box>
    </form>
  );
};

SigForm.defaultProps = {
  existing: null,
};

export default SigForm;
