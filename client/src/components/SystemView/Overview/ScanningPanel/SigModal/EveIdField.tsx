import { Button, FormHelperText, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import useSystemData from "../../../SystemData/useSystemData";

type EveIdFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  existingId: string | null;
};

const EveIdField = ({ value, onChange, existingId }: EveIdFieldProps) => {
  const { allSigs, deleteSignature } = useSystemData();
  const allSigsButExisting = allSigs.filter((sig) => sig.id !== existingId);
  const duplicate = allSigsButExisting.find((sig) => sig.eveId === value);

  const deleteDuplicate = async () => {
    if (duplicate) {
      await deleteSignature(duplicate.id);
    }
  };

  return (
    <TextField
      label="ID"
      value={value}
      onChange={onChange}
      error={!!duplicate}
      helperText={
        duplicate && (
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
