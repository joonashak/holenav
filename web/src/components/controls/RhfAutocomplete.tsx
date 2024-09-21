import { Autocomplete, TextField } from "@mui/material";
import {
  Control,
  Controller,
  ControllerProps,
  UseControllerReturn,
} from "react-hook-form";

type RhfAutocompleteProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>;
  options: string[];
  label?: string;
  rules?: ControllerProps["rules"];
};

const RhfAutocomplete = ({
  options,
  name,
  control,
  label,
  rules,
}: RhfAutocompleteProps) => {
  const getOptionLabel = (option: unknown): string =>
    typeof option === "string" ? option : "";

  const Render = ({ field, fieldState }: UseControllerReturn) => (
    <Autocomplete
      value={field.value}
      onChange={(_, value) => field.onChange({ target: { value } })}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          data-cy={`autocomplete-${name}-input`}
          error={!!fieldState.error}
          helperText={!!fieldState.error && fieldState.error.message}
        />
      )}
      fullWidth
      data-cy={`autocomplete-${name}`}
    />
  );

  return (
    <Controller render={Render} name={name} control={control} rules={rules} />
  );
};

export default RhfAutocomplete;
