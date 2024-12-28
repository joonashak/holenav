import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  Character,
  GetMyUserPreferencesDocument,
} from "../generated/graphql-operations";

const useSelectedCharacter = () => {
  const [selectedCharacterEveId, setSelectedCharacterEveId] = useLocalStorage(
    "holenav-selected-character",
    0,
  );

  const { data } = useQuery(GetMyUserPreferencesDocument);

  const characters: Character[] = data
    ? [data.getMyUserPreferences.user.main].concat(
        ...data.getMyUserPreferences.user.alts,
      )
    : [];

  const characterEveIds = characters.map((char) => char.eveId);
  const selectedCharacter = characters.find(
    (char) => char.eveId === selectedCharacterEveId,
  );

  useEffect(() => {
    // Select main if character is not selected.
    if (selectedCharacterEveId === 0 && data) {
      setSelectedCharacterEveId(data.getMyUserPreferences.user.main.eveId);
    }

    // Select main if selected character does not exist.
    if (!characterEveIds.includes(selectedCharacterEveId) && data) {
      setSelectedCharacterEveId(data.getMyUserPreferences.user.main.eveId);
    }
  }, [
    selectedCharacterEveId,
    setSelectedCharacterEveId,
    data,
    characterEveIds,
  ]);

  return {
    /**
     * Currently selected character EVE ID.
     *
     * While this value is always a number for typing convenience, it comes with
     * the caveat that it may be momentarily zero. This happens if local storage
     * does not include a value for selected character and the user preferences
     * query is still fetching.
     *
     * Consider using `selectedCharacter` for better handling of loading state.
     */
    selectedCharacterEveId,
    setSelectedCharacterEveId,
    /**
     * Full character object from backend for selected character.
     *
     * This is `undefined` while the user preferences query is fetching.
     */
    selectedCharacter,
  };
};

export default useSelectedCharacter;
