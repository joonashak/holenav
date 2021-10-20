import { useMutation } from "@apollo/client";
import { Box, Button, FormGroup } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_SIGNATURE } from "../../../SystemData/graphql";
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
  const { addSignature, id } = useSystemData();
  const [addSigMutation, { data, loading, error }] = useMutation(ADD_SIGNATURE);
  const { setNotification } = useNotification();

  const onSubmit = (formData: any) => {
    addSigMutation({ variables: { ...formData, type, eveId, systemId: id } });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      addSignature(data.addSignature);
      setNotification("Signature added.", "success", true);
    }
  }, [data, loading, error]);

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
