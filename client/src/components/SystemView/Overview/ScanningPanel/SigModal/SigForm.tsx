import { Box, Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  key: `sig-type-${key}`,
  value: key,
  label,
}));

type SigFormProps = {
  type: SigTypes;
  eveId: string;
};

export default ({ type, eveId }: SigFormProps) => {
  const { handleSubmit, control } = useForm({ defaultValues: { type: typeOptions[0].value } });
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
