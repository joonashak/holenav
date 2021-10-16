import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { UserDataContext } from ".";
import { UPDATE_SELECTED_MAP } from "./graphql";
import { UserData } from "./types";

type UserDataHook = UserData & {
  setSelectedMap: (mapId: string) => void;
};

export default (): UserDataHook => {
  const [state, setState] = useContext<any>(UserDataContext);
  const { settings } = state as UserData;
  const { selectedMap, maps } = settings;

  const [updateSelectedMapMutation] = useMutation(UPDATE_SELECTED_MAP);

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

  return {
    ...state,
    settings: {
      ...settings,
      selectedMap: selectedMap || maps[0],
    },
    setSelectedMap,
  };
};
