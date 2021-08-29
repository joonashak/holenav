/* eslint-disable react/jsx-props-no-spreading */
import { MenuItem, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

type ControlledSelectProps = {
  name: string;
  control: any;
  label: string;
  options: Options[];
};

type Options = {
  key: string;
  value: string;
  label: string;
};

export default ({ options, name, control, label }: ControlledSelectProps) => {
  const Render = ({ field }: any) => (
    <TextField {...field} select label={label}>
      {options.map(({ key, value, label: optionLabel }) => (
        <MenuItem key={key} value={value}>
          {optionLabel}
        </MenuItem>
      ))}
    </TextField>
  );

  return <Controller name={name} control={control} render={Render} />;
};
