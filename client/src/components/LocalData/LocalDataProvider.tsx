import { createState, useState } from "@hookstate/core";
import { useEffect } from "react";
import activeCharacterStore from "./activeCharacterStore";
import { LocalData, LocalDataProviderProps } from "./types";

const defaultValue: LocalData = {
  activeCharacter: null,
};

export const localDataState = createState(defaultValue);

const LocalDataProvider = ({ children }: LocalDataProviderProps) => {
  const state = useState(localDataState);
  const pending = useState(true);

  useEffect(() => {
    (async () => {
      const activeCharacter = await activeCharacterStore.getActiveCharacter();
      state.set({ activeCharacter });
      pending.set(false);
    })();
  }, []);

  if (pending) {
    return null;
  }

  return children;
};

export default LocalDataProvider;
