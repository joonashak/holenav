import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import useSystemData from "../../../SystemData/useSystemData";

type EveIdFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  existingId: string | null;
};

const EveIdField = ({ value, onChange, existingId }: EveIdFieldProps) => {
  const { allSigs } = useSystemData();
  const allSigsButExisting = allSigs.filter((sig) => sig.id !== existingId);
  const isDuplicate = !!allSigsButExisting.find((sig) => sig.eveId === value);

  return (
    <TextField
      label="ID"
      value={value}
      onChange={onChange}
      error={isDuplicate}
      helperText={isDuplicate && "Duplicate ID."}
      data-cy="textfield-eveId"
      fullWidth
    />
  );
};

export default EveIdField;
