import { BaseTextFieldProps, TextField } from "@mui/material";
import { Control, useController, UseControllerProps } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  control: Control<any, object>;
  label: string;
  rules?: UseControllerProps["rules"];
  type?: BaseTextFieldProps["type"];
};

const ControlledTextField = ({ name, control, label, rules, type }: ControlledTextFieldProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });
  const { error } = fieldState;

  return (
    <TextField
      {...field}
      label={label}
      error={!!error}
      helperText={error && error.message}
      variant="outlined"
      inputProps={{ "data-cy": `textfield-${name}` }}
      type={type}
      fullWidth
    />
  );
};

ControlledTextField.defaultProps = {
  rules: {},
  type: "text",
};

export default ControlledTextField;
