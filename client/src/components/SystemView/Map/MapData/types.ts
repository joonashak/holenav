import { RawNodeDatum, TreeLinkDatum, TreeNodeDatum } from "react-d3-tree/lib/types/common";
import MassStatus from "../../../../enum/MassStatus";

export type MapState = {
  connectionTree: ConnectionTree;
};

export type ConnectionTree = {
  rootSystemName: string | null;
  children: RawNodeDatum[];
};

export type MapNodeDatum = TreeNodeDatum & {
  type?: string;
  reverseType?: string;
  eol?: boolean;
  massStatus?: MassStatus;
};

export type MapLinkDatum = TreeLinkDatum & {
  target: {
    data: MapNodeDatum;
  };
};
