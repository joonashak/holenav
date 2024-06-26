import { useLazyQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useState as useReactState } from "react";
import {
  HolenavCharacter,
  SearchCharactersByMainDocument,
  SearchCharactersByMainQuery,
  SearchCharactersByMainQueryVariables,
} from "../../../../../generated/graphqlOperations";
import DebouncingAutocomplete from "../../../../common/DebouncingAutocomplete";
import { manageFolderState } from "./ManageFolder";

const CharacterSearch = () => {
  const { selectedCharacter } = useState(manageFolderState);
  const [options, setOptions] = useReactState<HolenavCharacter[]>([]);

  const [searchQuery, { loading }] = useLazyQuery<
    SearchCharactersByMainQuery,
    SearchCharactersByMainQueryVariables
  >(SearchCharactersByMainDocument, {
    onCompleted: ({ searchCharactersByMain }) => {
      setOptions(searchCharactersByMain);
    },
  });

  return (
    <DebouncingAutocomplete<HolenavCharacter>
      dataCy="character-search-textfield"
      label="Select Character"
      options={options}
      optionLabelKey="name"
      optionValueKey="esiId"
      onChange={(_, character) => selectedCharacter.set(character)}
      search={(search) => searchQuery({ variables: { search } })}
      loading={loading}
    />
  );
};

export default CharacterSearch;
