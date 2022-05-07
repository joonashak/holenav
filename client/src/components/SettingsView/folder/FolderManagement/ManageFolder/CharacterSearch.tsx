import { Autocomplete, TextField } from "@mui/material";
import { useDebounce } from "@react-hook/debounce";
import { useEffect, useState } from "react";
import useLazyAuthenticatedQuery from "../../../../../auth/useLazyAuthenticatedQuery";
import {
  Character,
  SearchCharactersByMainDocument,
} from "../../../../../generated/graphqlOperations";

const CharacterSearch = () => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const [value, setValue] = useDebounce("", 200);

  const [searchQuery, { data }] = useLazyAuthenticatedQuery(SearchCharactersByMainDocument);

  useEffect(() => {
    if (!value) {
      return;
    }

    console.log("value", value);
    searchQuery({ variables: { search: value } });
  }, [value]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setOptions(data.searchCharactersByMain.map(({ name }: Character) => name));
  }, [data]);

  return (
    <Autocomplete
      open={open}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="asd"
          onChange={(event) => setValue(event.target.value)}
          InputProps={{ ...params.InputProps, endAdornment: <>{params.InputProps.endAdornment}</> }}
        />
      )}
    />
  );
};

export default CharacterSearch;
