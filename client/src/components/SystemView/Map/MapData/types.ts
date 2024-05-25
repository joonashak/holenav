import {
  RawNodeDatum,
  TreeLinkDatum,
  TreeNodeDatum,
} from "react-d3-tree/lib/types/types/common.d";
import { MassStatus, Signature } from "../../../../generated/graphqlOperations";

export type MapState = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};

export type MapNodeDatum = TreeNodeDatum & {
  wormhole?: Wormhole;
  signature?: Signature;
};

export type MapLinkDatum = TreeLinkDatum & {
  target: {
    data: MapNodeDatum;
  };
};

export type Wormhole = {
  eol: boolean;
  massStatus: MassStatus;
  destinationName: string;
  unknownDestination: boolean;
  reverseType: string;
  wormholeType: string;
};
