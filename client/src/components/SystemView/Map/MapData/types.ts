import { RawNodeDatum, TreeLinkDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
import { Signature } from "../../../../generated/graphqlOperations";

export type MapState = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};

export type MapNodeDatum = TreeNodeDatum & {
  signature?: Signature;
};

export type MapLinkDatum = TreeLinkDatum & {
  target: {
    data: MapNodeDatum;
  };
};
