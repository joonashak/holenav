import { RawNodeDatum, TreeLinkDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";

export type MapState = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};

export type MapNodeDatum = TreeNodeDatum & {
  type?: string;
  eol?: boolean;
};

export type MapLinkDatum = TreeLinkDatum & {
  target: {
    data: MapNodeDatum;
  };
};
