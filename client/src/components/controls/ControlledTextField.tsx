import { TextField, TextFieldProps } from "@mui/material";
import { Control, useController, UseControllerProps } from "react-hook-form";

type ControlledTextFieldProps = TextFieldProps & {
  name: string;
  control: Control<any, object>;
  rules?: UseControllerProps["rules"];
  type?: TextFieldProps["type"];
};

const ControlledTextField = ({ name, control, rules, type, ...rest }: ControlledTextFieldProps) => {
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
      error={!!error}
      helperText={error && error.message}
      variant="outlined"
      inputProps={{ "data-cy": `textfield-${name}` }}
      type={type}
      fullWidth
      {...rest}
    />
  );
};

ControlledTextField.defaultProps = {
  rules: {},
  type: "text",
};

export default ControlledTextField;
