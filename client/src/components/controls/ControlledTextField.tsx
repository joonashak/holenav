/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  control: any;
  label: string;
};

export default ({ name, control, label }: ControlledTextFieldProps) => {
  const Render = ({ field }: any) => <TextField {...field} label={label} variant="outlined" />;

  return <Controller name={name} control={control} render={Render} defaultValue="" />;
};
