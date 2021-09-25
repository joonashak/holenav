import { useContext } from "react";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { MapDataContext } from ".";

type MapData = {
  rootSystemName: string;
  children: RawNodeDatum[];
};

export default (): MapData => {
  const [state, setState] = useContext<any>(MapDataContext);

  return {
    ...state,
  };
};
