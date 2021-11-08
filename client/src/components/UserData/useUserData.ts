import { FetchResult, useMutation } from "@apollo/client";
import { useContext } from "react";
import { UserDataContext } from ".";
import { ADD_SAVED_MAP, UPDATE_SELECTED_MAP } from "./graphql";
import { SavedMap, UserData } from "./types";

type UserDataHook = UserData & {
  setSelectedMap: (mapId: string) => void;
  addSavedMap: (newMap: SavedMap) => Promise<FetchResult>;
};

export default (): UserDataHook => {
  const [state, setState] = useContext<any>(UserDataContext);
  const { settings } = state as UserData;
  const { selectedMap, maps } = settings;

  const [updateSelectedMapMutation] = useMutation(UPDATE_SELECTED_MAP);
  const [addSavedMapMutation] = useMutation(ADD_SAVED_MAP);

  const setSelectedMap = async (mapId: string) => {
    const newMap = settings.maps.find((m) => m.id === mapId);

    if (newMap) {
      const { data } = await updateSelectedMapMutation({ variables: { selectedMapId: newMap.id } });
      setState((prev: UserData) => ({
        ...prev,
        settings: { ...prev.settings, selectedMap: data.updateSelectedMap.settings.selectedMap },
      }));
    }
  };

  const addSavedMap = async (newMap: SavedMap): Promise<FetchResult> => {
    const res = await addSavedMapMutation({ variables: newMap });

    if (res.data && !res.errors) {
      setState((prev: UserData) => ({
        ...prev,
        settings: { ...prev.settings, maps: res.data.addSavedMap.settings.maps },
      }));
    }

    return res;
  };

  return {
    ...state,
    settings: {
      ...settings,
      selectedMap: selectedMap || maps[0],
    },
    setSelectedMap,
    addSavedMap,
  };
};
