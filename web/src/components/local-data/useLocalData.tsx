import { createState, useState } from "@hookstate/core";
import activeCharacterStore from "./stores/activeCharacterStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();

  return { activeCharacter };
});

const useLocalData = () => {
  const state = useState(localState);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    state.merge({ activeCharacter: esiId });
  };

  const setDefaultActiveCharacter = async (esiId: string) => {
    if (!state.activeCharacter.value) {
      setActiveCharacter(esiId);
    }
  };

  return {
    get loadingLocalState() {
      return state.promised;
    },
    get activeCharacter() {
      return state.activeCharacter.get();
    },
    setActiveCharacter,
    setDefaultActiveCharacter,
  };
};

export default useLocalData;
