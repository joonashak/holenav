import { Box, Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData, { Signature } from "../../../SystemData/useSystemData";

type SigFormProps = {
  type: SigTypes;
  eveId: string;
  existing?: Signature;
};

const SigForm = ({ type, eveId, existing }: SigFormProps) => {
  const { handleSubmit, control } = useForm({ defaultValues: { name: existing?.name || "" } });
  const { addSignature } = useSystemData();
  const { setNotification } = useNotification();

  const onSubmit = async (formData: any) => {
    const res = await addSignature({ ...formData, type, eveId });

    if (res.data && !res.errors) {
      setNotification("Signature added.", "success", true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ "& > *": { mt: 3, mb: 3 } }}>
        <FormGroup>
          <ControlledTextField name="name" control={control} label="Name" />
        </FormGroup>
        <FormGroup>
          <Button type="submit" variant="contained" color="secondary">
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
