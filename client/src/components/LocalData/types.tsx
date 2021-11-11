import { ReactNode } from "react";

export type LocalData = {
  activeCharacter: string | null;
};

export type LocalDataHook = LocalData & {
  setActiveCharacter: (esiId: string) => void;
};

export type LocalDataProviderProps = {
  children: ReactNode;
};
