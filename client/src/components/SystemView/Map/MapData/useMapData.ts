import { useContext } from "react";
import { MapDataContext } from ".";
import { MapData } from "./types";

export default (): MapData => {
  const [state] = useContext<any>(MapDataContext);

  return {
    ...state,
  };
};
