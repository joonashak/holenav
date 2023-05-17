import { MenuItem, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type ControlledSelectProps = {
  name: string;
  control: Control;
  label: string;
  options: Options[];
};

type Options = {
  key: string;
  value: string;
  label: string;
};

// FIXME: Rename and update to use styled select (or integrate in the same mess...?)
const ControlledSelect = ({ options, name, control, label }: ControlledSelectProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Render = ({ field }: any) => (
    <TextField {...field} select label={label} fullWidth data-cy={`select-${name}`}>
      {options.map(({ key, value, label: optionLabel }) => (
        <MenuItem key={key} value={value}>
          {optionLabel}
        </MenuItem>
      ))}
    </TextField>
  );

  return <Controller name={name} control={control} render={Render} />;
};

export default ControlledSelect;
