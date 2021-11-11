import { useContext } from "react";
import { LocalDataContext } from ".";
import activeCharacterStore from "./activeCharacterStore";
import { LocalDataHook } from "./types";

const useLocalData = (): LocalDataHook => {
  const [state, setState] = useContext(LocalDataContext);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    setState({ activeCharacter: esiId });
  };

  return {
    ...state,
    setActiveCharacter,
  };
};

export default useLocalData;
