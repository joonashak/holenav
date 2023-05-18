import { useState } from "@hookstate/core";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useDebounce } from "@react-hook/debounce";
import { useEffect, useState as useReactState } from "react";
import { manageFolderState } from ".";
import useLazyAuthenticatedQuery from "../../../../../auth/useLazyAuthenticatedQuery";
import {
  Character,
  SearchCharactersByMainDocument,
  SearchCharactersByMainQuery,
  SearchCharactersByMainQueryVariables,
} from "../../../../../generated/graphqlOperations";

const CharacterSearch = () => {
  const { selectedCharacter } = useState(manageFolderState);
  const [options, setOptions] = useReactState<Character[]>([]);
  const [open, setOpen] = useReactState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const [debouncedValue, setDebouncedValue] = useDebounce("", 200);

  const [searchQuery, { loading }] = useLazyAuthenticatedQuery<
    SearchCharactersByMainQuery,
    SearchCharactersByMainQueryVariables
  >(SearchCharactersByMainDocument, {
    onCompleted: ({ searchCharactersByMain }) => {
      setOptions(searchCharactersByMain);
    },
  });

  useEffect(() => {
    if (!debouncedValue) {
      return;
    }
    searchQuery({ variables: { search: debouncedValue } });
  }, [debouncedValue]);

  return (
    <Autocomplete
      open={open}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      options={options}
      getOptionLabel={({ name }) => name}
      isOptionEqualToValue={(opt, val) => opt.esiId === val.esiId}
      onChange={(_, character) => selectedCharacter.set(character)}
      onInputChange={(_, value) => setDebouncedValue(value)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Character"
          data-cy="character-search-textfield"
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
};

export default CharacterSearch;
