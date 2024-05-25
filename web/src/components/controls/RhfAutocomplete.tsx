import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, UseControllerReturn } from "react-hook-form";

type RhfAutocompleteProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>;
  options: string[];
};

const RhfAutocomplete = ({ options, name, control }: RhfAutocompleteProps) => {
  const getOptionLabel = (option: unknown): string =>
    typeof option === "string" ? option : "";

  // eslint-disable-next-line react/no-unstable-nested-components
  const Render = ({ field }: UseControllerReturn) => (
    <Autocomplete
      value={field.value}
      onChange={(_, value) => field.onChange({ target: { value } })}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Destination"
          data-cy={`autocomplete-${name}-input`}
        />
      )}
      fullWidth
      data-cy={`autocomplete-${name}`}
    />
  );

  return <Controller render={Render} name={name} control={control} />;
};

export default RhfAutocomplete;
