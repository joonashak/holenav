import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";

type SelectProps = {
  options: Array<{ id: string; value: string; label: string }>;
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  title: string;
};

const Select = ({ options, onChange, value, title }: SelectProps) => {
  const labelId = `select-${title}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{title}</InputLabel>
      <MuiSelect
        value={value}
        labelId={labelId}
        label={title}
        onChange={onChange}
        variant="outlined"
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
