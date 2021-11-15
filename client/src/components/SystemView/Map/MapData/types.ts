import { RawNodeDatum } from "react-d3-tree/lib/types/common";

export type MapData = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};
