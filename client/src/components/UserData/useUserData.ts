import { FetchResult, useMutation } from "@apollo/client";
import { useContext } from "react";
import { UserDataContext } from ".";
import { ADD_SAVED_MAP, UPDATE_SELECTED_MAP, DELETE_SAVED_MAP, REMOVE_ALT } from "./graphql";
import { SavedMap, UserData } from "./types";

type UserDataHook = UserData & {
  setSelectedMap: (mapId: string) => void;
  addSavedMap: (newMap: SavedMap) => Promise<FetchResult>;
  deleteSavedMap: (mapId: string) => Promise<FetchResult>;
  removeAlt: (esiId: string) => Promise<FetchResult>;
};

export default (): UserDataHook => {
  const [state, setState] = useContext<any>(UserDataContext);
  const { settings } = state as UserData;
  const { selectedMap, maps } = settings;

  const [updateSelectedMapMutation] = useMutation(UPDATE_SELECTED_MAP);
  const [addSavedMapMutation] = useMutation(ADD_SAVED_MAP);
  const [deleteSavedMapMutation] = useMutation(DELETE_SAVED_MAP);

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

  const deleteSavedMap = async (mapId: string): Promise<FetchResult> => {
    const res = await deleteSavedMapMutation({ variables: { mapId } });

    if (res.data && !res.errors) {
      setState((prev: UserData) => ({
        ...prev,
        settings: { ...prev.settings, maps: res.data.deleteSavedMap.settings.maps },
      }));
    }

    return res;
  };

  const [removeAltMutation] = useMutation(REMOVE_ALT);

  const removeAlt = async (esiId: string): Promise<FetchResult> => {
    const res = await removeAltMutation({ variables: { esiId } });

    if (res.data && !res.errors) {
      setState((prev: UserData) => ({ ...prev, alts: res.data.removeAlt.alts }));
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
    deleteSavedMap,
    removeAlt,
  };
};
