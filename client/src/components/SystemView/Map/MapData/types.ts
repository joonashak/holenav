import { RawNodeDatum, TreeLinkDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
import { Wormhole } from "../../../../generated/graphqlOperations";

export type MapState = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};

export type MapNodeDatum = TreeNodeDatum & {
  wormhole?: Wormhole;
};

export type MapLinkDatum = TreeLinkDatum & {
  target: {
    data: MapNodeDatum;
  };
};
