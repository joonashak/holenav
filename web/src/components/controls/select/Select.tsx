import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { ReactElement } from "react";

type SelectOption = {
  id: string | number;
  value: string | number;
  label: string | ReactElement;
};

type SelectProps = {
  options: SelectOption[];
  onChange: (event: SelectChangeEvent) => void;
  value: SelectOption["value"];
  title: string;
};

const Select = ({ options, onChange, value, title }: SelectProps) => {
  const labelId = `select-${title}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{title}</InputLabel>
      <MuiSelect
        value={value.toString()}
        labelId={labelId}
        label={title}
        onChange={onChange}
        data-cy={`select-${title}`}
      >
        {options.map((opt) => (
          <MenuItem key={`select-${title}-option-${opt.id}`} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
