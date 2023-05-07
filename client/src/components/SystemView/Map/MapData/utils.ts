import { flatMapDeep } from "lodash";
import { RawNodeDatum } from "react-d3-tree/lib/types/types/common.d";
import { MapNodeDatum } from "./types";

const getChildren = (node: MapNodeDatum): any => {
  if (!node.children || !node.children.length) {
    return node;
  }
  return [node, flatMapDeep(node.children, getChildren)];
};

export const flattenConnectionTreeChildren = (rootChildren: RawNodeDatum[]): MapNodeDatum[] => {
  const connections = flatMapDeep(rootChildren, getChildren) as unknown as MapNodeDatum[];
  return connections;
};
