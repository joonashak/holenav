/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, UseControllerReturn } from "react-hook-form";

type RhfAutocompleteProps = {
  name: string;
  control: Control<any, object>;
  options: string[];
};

const RhfAutocomplete = ({ options, name, control }: RhfAutocompleteProps) => {
  const getOptionLabel = (option: unknown): string => (typeof option === "string" ? option : "");

  const Render = ({ field }: UseControllerReturn) => (
    <Autocomplete
      value={field.value}
      onChange={(_, value) => field.onChange({ target: { value } })}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField {...params} label="Destination" data-cy={`autocomplete-${name}-input`} />
      )}
      fullWidth
      data-cy={`autocomplete-${name}`}
    />
  );

  return <Controller render={Render} name={name} control={control} />;
};

export default RhfAutocomplete;
