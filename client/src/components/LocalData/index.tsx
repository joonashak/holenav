import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import activeCharacterStore from "./activeCharacterStore";
import { LocalData, LocalDataProviderProps } from "./types";

const defaultValues: LocalData = {
  activeCharacter: null,
};

export const LocalDataContext = createContext<[LocalData, Dispatch<SetStateAction<LocalData>>]>([
  defaultValues,
  () => {},
]);
LocalDataContext.displayName = "Local Data";

/**
 * Context provider for using local data through hooks. Requires all local data to be
 * loaded before rendering children.
 */
const LocalDataProvider = ({ children }: LocalDataProviderProps) => {
  const [state, setState] = useState<LocalData>(defaultValues);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    (async () => {
      const activeCharacter = await activeCharacterStore.getActiveCharacter();
      setState({ activeCharacter });
      setPending(false);
    })();
  }, []);

  if (pending) {
    return null;
  }

  return (
    <LocalDataContext.Provider value={[state, setState]}>{children}</LocalDataContext.Provider>
  );
};

export default LocalDataProvider;
