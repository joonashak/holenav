import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { userState } from ".";
import useAuthenticatedMutation from "../../auth/useAuthenticatedMutation";
import { ADD_SAVED_MAP, UPDATE_SELECTED_MAP, DELETE_SAVED_MAP, REMOVE_ALT } from "./graphql";
import { SavedMap } from "./types";

const useUserData = () => {
  const state = useState(userState);

  const [updateSelectedMapMutation] = useAuthenticatedMutation(UPDATE_SELECTED_MAP, {
    onCompleted: (data) => {
      const { id, name, rootSystemName } = data.updateSelectedMap.settings.selectedMap;
      state.settings.selectedMap.set({ id, name, rootSystemName });
    },
  });

  const setSelectedMap = (mapId: string) => {
    const newMap = state.settings.maps.get().find((m) => m.id === mapId);

    if (newMap) {
      updateSelectedMapMutation({ variables: { selectedMapId: newMap.id } });
    }
  };

  const [addSavedMapMutation] = useAuthenticatedMutation(ADD_SAVED_MAP, {
    onCompleted: (data) => {
      const { maps } = data.addSavedMap.settings;
      state.settings.maps.set(maps);
    },
  });

  const addSavedMap = async (newMap: SavedMap): Promise<FetchResult> =>
    addSavedMapMutation({ variables: newMap });

  const [deleteSavedMapMutation] = useAuthenticatedMutation(DELETE_SAVED_MAP, {
    onCompleted: (data) => {
      const { maps } = data.deleteSavedMap.settings;
      state.settings.maps.set(maps);
    },
  });

  const deleteSavedMap = async (mapId: string): Promise<FetchResult> =>
    deleteSavedMapMutation({ variables: { mapId } });

  const [removeAltMutation] = useAuthenticatedMutation(REMOVE_ALT, {
    onCompleted: (data) => {
      state.alts.set(data.removeAlt.alts);
    },
  });

  const removeAlt = async (esiId: string): Promise<FetchResult> =>
    removeAltMutation({ variables: { esiId } });

  return {
    get id() {
      return state.id.get();
    },
    get main() {
      return state.main.get();
    },
    get alts() {
      return state.alts.get();
    },
    get settings() {
      const maps = state.settings.maps.attach(Downgraded).get();
      const selectedMap = state.settings.selectedMap.get() || maps[0];
      return { maps, selectedMap };
    },
    get systemRole() {
      return state.systemRole.get();
    },
    setSelectedMap,
    addSavedMap,
    deleteSavedMap,
    removeAlt,
  };
};

export default useUserData;
