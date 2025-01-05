import { Edge, Node } from "@xyflow/react";
import { sortBy } from "lodash";
import {
  FindConnectionGraphQuery,
  FindMap,
  GraphConnection,
} from "../../../generated/graphql-operations";
import { SystemNodeData } from "./map-flow-types";

let nodes: Node<SystemNodeData>[] = [];
// TODO: Edges need data from GraphConnection.
let edges: Edge[] = [];

const connectionToNode = (
  connection: GraphConnection,
): Node<SystemNodeData> => ({
  id: connection.id,
  type: "systemNode",
  position: { x: 0, y: 0 },
  data: { systemName: connection.to },
});

/** Recursive factory to build tree from flat connection node list. */
const findChildren = (
  current: GraphConnection,
  connections: GraphConnection[],
): void => {
  // Check for loop before pushing new node.
  const loop = !!nodes.find((n) => n.data.systemName === current.to);
  nodes.push(connectionToNode(current));

  if (loop) {
    // console.log("loop", current.to);
  }

  // Remove reverse connection to prevent traversing backwards through it.
  const connectionsWithoutReverse = connections.filter(
    (conn) => conn.id !== current.reverse,
  );

  const directChildren = connectionsWithoutReverse.filter(
    (conn) => conn.from === current.to,
  );

  if (directChildren.length === 0 || loop) {
    return;
  }

  directChildren.forEach((child) =>
    edges.push({
      id: `${current.id}-${child.id}`,
      source: current.id,
      target: child.id,
    }),
  );

  directChildren.forEach((conn) =>
    findChildren(conn, connectionsWithoutReverse),
  );
};

/** Build hierarchical connection tree from given root system. */
const buildFlowData = (
  map: FindMap | undefined,
  data: FindConnectionGraphQuery | undefined,
) => {
  if (!map) {
    return { nodes: [], edges: [] };
  }

  nodes = [
    {
      id: "1",
      type: "systemNode",
      position: { x: 0, y: 0 },
      data: { systemName: map.rootSystemName, name: map.name },
    },
  ];

  if (!data || data.findConnectionGraph.connections.length === 0) {
    return { nodes, edges: [] };
  }

  /**
   * Children may be sorted differently for rendering but when building the tree
   * the original child list should probably be sorted by ID to keep the tree
   * stable (especially when there are loops).
   */
  const connections = sortBy(data.findConnectionGraph.connections, "id");

  const chainRoots = connections.filter(
    (conn) => conn.from === map.rootSystemName,
  );

  edges = [];

  chainRoots.forEach((child) =>
    edges.push({
      id: `1-${child.id}`,
      source: "1",
      target: child.id,
    }),
  );

  chainRoots.forEach((chainRoot) => findChildren(chainRoot, connections));

  return {
    nodes,
    edges,
  };
};

export default buildFlowData;
