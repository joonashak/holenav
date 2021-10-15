import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { SavedMap } from "../../../UserData/types";

export type MapData = {
  selectedMap: SavedMap;
  connectionTree: ConnectionTree;
  setSelectedMap: (id: string) => void;
};

export type ConnectionTree = {
  rootSystemName: string;
  children: RawNodeDatum[];
};
