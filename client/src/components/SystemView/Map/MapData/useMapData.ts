import { useContext } from "react";
import { MapDataContext } from ".";
import useUserData from "../../../UserData/useUserData";
import { MapData } from "./types";

export default (): MapData => {
  const [state, setState] = useContext<any>(MapDataContext);
  const {
    settings: { maps },
  } = useUserData();

  const setSelectedMap = (mapId: string) => {
    const newMap = maps.find((m) => m.id === mapId);
    if (newMap) {
      setState((prev: MapData) => ({ ...prev, selectedMap: newMap }));
    }
  };

  return {
    ...state,
    setSelectedMap,
  };
};
