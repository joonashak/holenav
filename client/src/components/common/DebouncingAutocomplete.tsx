import { Autocomplete, AutocompleteProps, CircularProgress, TextField } from "@mui/material";
import { useDebounce } from "@react-hook/debounce";
import { get } from "lodash";
import { useEffect, useState } from "react";

type DebouncingAutocompleteProps<T> = Partial<AutocompleteProps<T, false, false, false>> & {
  /**
   * Value for `TextField` input's `data-cy` attribute.
   */
  dataCy?: string;
  /**
   * `TextField` label text.
   */
  label: string;
  /**
   * List of options to show in the dropdown.
   */
  options: T[];
  /**
   * Key to use for getting label text from `options` objects.
   */
  optionLabelKey: string;
  /**
   * Key to use for getting value from `options` objects.
   *
   * The resulting value is used for equality comparison so it should be unique and stable.
   */
  optionValueKey: string;
  /**
   * Callback fired when search string has changed and debounce has passed.
   */
  search: (text: string) => void;
};

export default function DebouncingAutocomplete<T>({
  dataCy = "",
  label,
  options,
  optionLabelKey,
  optionValueKey,
  loading,
  onChange,
  search,
}: DebouncingAutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const [debouncedValue, setDebouncedValue] = useDebounce("", 200);

  useEffect(() => {
    if (!debouncedValue) {
      return;
    }
    search(debouncedValue);
  }, [debouncedValue]);

  return (
    <Autocomplete
      open={open}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      loading={loading}
      options={options}
      getOptionLabel={(opt) => get(opt, optionLabelKey, "")}
      isOptionEqualToValue={(opt, val) => get(opt, optionValueKey) === get(val, optionValueKey)}
      onChange={onChange}
      onInputChange={(_, value) => setDebouncedValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          data-cy={dataCy}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
