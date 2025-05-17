import { TextField, TextFieldProps } from "@mui/material";
import { Control, UseControllerProps, useController } from "react-hook-form";

type ControlledTextFieldProps = TextFieldProps & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>;
  rules?: UseControllerProps["rules"];
  type?: TextFieldProps["type"];
};

const ControlledTextField = ({
  name,
  control,
  rules = {},
  type = "text",
  ...rest
}: ControlledTextFieldProps) => {
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
      type={type}
      fullWidth
      {...rest}
      slotProps={{
        htmlInput: { "data-cy": `textfield-${name}` },
      }}
    />
  );
};

export default ControlledTextField;
