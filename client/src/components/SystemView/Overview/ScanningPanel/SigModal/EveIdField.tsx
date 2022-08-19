import { Button, FormHelperText, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import useSignatures from "../../../SystemData/useSignatures";

type EveIdFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  existingId: string | null;
};

const EveIdField = ({ value, onChange, existingId }: EveIdFieldProps) => {
  const { signatures, deleteSignature } = useSignatures();
  const allSigsButExisting = signatures.filter((sig) => sig.id !== existingId);
  const duplicate = allSigsButExisting.find((sig) => sig.eveId === value);
  // Don't count empty EVE ID's as duplicates:
  const isDuplicate = !!(value && duplicate);

  const deleteDuplicate = async () => {
    if (isDuplicate) {
      await deleteSignature(duplicate.id);
    }
  };

  return (
    <TextField
      label="ID"
      value={value}
      onChange={onChange}
      error={isDuplicate}
      helperText={
        isDuplicate && (
          <FormHelperText>
            Duplicate ID.
            <Button color="error" variant="contained" onClick={deleteDuplicate}>
              Remove duplicate
            </Button>
          </FormHelperText>
        )
      }
      data-cy="textfield-eveId"
      fullWidth
    />
  );
};

export default EveIdField;
