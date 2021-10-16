import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
  Theme,
} from "@material-ui/core";
import { ChangeEvent } from "react";

type SelectProps = {
  options: Array<{ id: string; value: string; label: string }>;
  onChange: (event: ChangeEvent<{ value: unknown }>) => void;
  value: string;
  title: string;
};

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.secondary.light,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
}));

const Select = ({ options, onChange, value, title }: SelectProps) => {
  const labelClasses = useLabelStyles();

  return (
    <FormControl fullWidth>
      <InputLabel id={`select-${title}-label`} classes={labelClasses}>
        {title}
      </InputLabel>
      <MuiSelect value={value} labelId={`select-${title}-label`} onChange={onChange}>
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
