import { useState } from "@hookstate/core";
import { useState as useReactState } from "react";
import useLazyAuthenticatedQuery from "../../../../../auth/useLazyAuthenticatedQuery";
import {
  Character,
  SearchCharactersByMainDocument,
  SearchCharactersByMainQuery,
  SearchCharactersByMainQueryVariables,
} from "../../../../../generated/graphqlOperations";
import DebouncingAutocomplete from "../../../../common/DebouncingAutocomplete";
import { manageFolderState } from "./ManageFolder";

const CharacterSearch = () => {
  const { selectedCharacter } = useState(manageFolderState);
  const [options, setOptions] = useReactState<Character[]>([]);

  const [searchQuery, { loading }] = useLazyAuthenticatedQuery<
    SearchCharactersByMainQuery,
    SearchCharactersByMainQueryVariables
  >(SearchCharactersByMainDocument, {
    onCompleted: ({ searchCharactersByMain }) => {
      setOptions(searchCharactersByMain);
    },
  });

  return (
    <DebouncingAutocomplete<Character>
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
