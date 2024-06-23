import { FetchResult, useMutation } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import {
  AddSavedMapDocument,
  AddSavedMapMutation,
  AddSavedMapMutationVariables,
  DeleteSavedMapDocument,
  DeleteSavedMapMutation,
  DeleteSavedMapMutationVariables,
  RemoveAltDocument,
  RemoveAltMutation,
  RemoveAltMutationVariables,
  SavedMap,
  UpdateSelectedMapDocument,
  UpdateSelectedMapMutation,
  UpdateSelectedMapMutationVariables,
} from "../../generated/graphqlOperations";
import { userState } from "./UserData";

const useUserData = () => {
  const state = useState(userState);

  const [updateSelectedMapMutation] = useMutation<
    UpdateSelectedMapMutation,
    UpdateSelectedMapMutationVariables
  >(UpdateSelectedMapDocument, {
    onCompleted: ({ updateSelectedMap }) => {
      state.settings.selectedMap.set(updateSelectedMap.settings.selectedMap);
    },
  });

  const setSelectedMap = (mapId: string) => {
    const newMap = state.settings.maps.get().find((m) => m.id === mapId);

    if (newMap) {
      updateSelectedMapMutation({ variables: { selectedMapId: newMap.id } });
    }
  };

  const [addSavedMapMutation] = useMutation<
    AddSavedMapMutation,
    AddSavedMapMutationVariables
  >(AddSavedMapDocument, {
    onCompleted: ({ addSavedMap }) => {
      const { maps } = addSavedMap.settings;
      state.settings.maps.set(maps);
    },
  });

  const addSavedMap = async (newMap: SavedMap): Promise<FetchResult> =>
    addSavedMapMutation({ variables: newMap });

  const [deleteSavedMapMutation] = useMutation<
    DeleteSavedMapMutation,
    DeleteSavedMapMutationVariables
  >(DeleteSavedMapDocument, {
    onCompleted: ({ deleteSavedMap }) => {
      const { maps } = deleteSavedMap.settings;
      state.settings.maps.set(maps);
    },
  });

  const deleteSavedMap = async (mapId: string): Promise<FetchResult> =>
    deleteSavedMapMutation({ variables: { mapId } });

  const [removeAltMutation] = useMutation<
    RemoveAltMutation,
    RemoveAltMutationVariables
  >(RemoveAltDocument, {
    onCompleted: ({ removeAlt }) => {
      state.alts.set(removeAlt.alts);
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
      return state.settings.attach(Downgraded).get();
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
