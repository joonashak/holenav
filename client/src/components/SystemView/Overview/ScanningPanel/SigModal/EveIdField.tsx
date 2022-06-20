import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";
import useSystemData from "../../../SystemData/useSystemData";

type EveIdFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const EveIdField = ({ value, onChange }: EveIdFieldProps) => {
  const { allSigs } = useSystemData();

  return (
    <TextField label="ID" value={value} onChange={onChange} data-cy="textfield-eveId" fullWidth />
  );
};

export default EveIdField;
