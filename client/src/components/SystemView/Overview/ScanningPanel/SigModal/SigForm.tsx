import { Box, Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { Signature, SigType } from "../../../../../generated/graphqlOperations";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useSigForm from "./useSigForm";

export type SigFormProps = {
  type: SigType;
  eveId: string;
  existing?: Signature;
  onClose: () => void;
};

const SigForm = (props: SigFormProps) => {
  const { existing } = props;
  const { handleSubmit, control } = useForm({ defaultValues: { name: existing?.name || "" } });
  const { submitSigForm } = useSigForm(props);

  return (
    <form onSubmit={handleSubmit(submitSigForm)}>
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
