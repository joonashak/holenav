import { createState, useState } from "@hookstate/core";
import activeCharacterStore from "./activeCharacterStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();
  return { activeCharacter };
});

const useLocalDataState = () => {
  const state = useState(localState);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    state.merge({ activeCharacter: esiId });
  };

  const setDefaultActiveCharacter = async (esiId: string) => {
    if (!state.activeCharacter) {
      setActiveCharacter(esiId);
    }
  };

  return {
    get activeCharacter() {
      return state.activeCharacter.get();
    },
    setActiveCharacter,
    setDefaultActiveCharacter,
  };
};

export default useLocalDataState;
