import { Edge, Node } from "@xyflow/react";
import { sortBy } from "lodash";
import {
  FindConnectionGraphQuery,
  FindMap,
  GraphConnection,
} from "../../../generated/graphql-operations";

/** J100001 -> J100015 -> Tama -> J155311 */

let visitedSystems: string[] = [];
let nodes: Node[] = [];
let edges: Edge[] = [];

const connectionToNode = (c: GraphConnection): Node => ({
  id: c.id,
  position: { x: 0, y: 0 },
  data: { label: c.to },
});

/** Recursive factory to build tree from flat connection node list. */
const findChildren = (
  start: GraphConnection,
  connections: GraphConnection[],
): any => {
  nodes.push(connectionToNode(start));
  visitedSystems.push(start.from);
  const loop = visitedSystems.includes(start.to);

  if (loop) {
    console.log("loop");
  }

  // Remove reverse connection to prevent traversing backwards through it.
  const connectionsWithoutReverse = connections.filter(
    (conn) => conn.id !== start.reverse,
  );

  const directChildren = connectionsWithoutReverse.filter(
    (conn) => conn.from === start.to,
  );

  if (directChildren.length === 0 || loop) {
    return {
      name: start.to,
      children: [],
    };
  }

  directChildren.forEach((child) =>
    edges.push({
      id: `${start.id}-${child.id}`,
      source: start.id,
      target: child.id,
    }),
  );

  return {
    name: start.to,
    children: directChildren.map((conn) =>
      findChildren(conn, connectionsWithoutReverse),
    ),
  };
};

/** Build hierarchical connection tree from given root system. */
const buildFlowData = (
  from: FindMap | undefined,
  data: FindConnectionGraphQuery | undefined,
) => {
  if (!from) {
    return { nodes: [], edges: [] };
  }

  nodes = [{ id: "1", position: { x: 0, y: 0 }, data: { label: from.name } }];

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
    (conn) => conn.from === from.rootSystemName,
  );

  edges = [];
  visitedSystems = [];

  chainRoots.forEach((child) =>
    edges.push({
      id: `1-${child.id}`,
      source: "1",
      target: child.id,
    }),
  );

  chainRoots.forEach((chainRoot) => findChildren(chainRoot, connections));

  return {
    // children: chainRoots.map((chainRoot) =>
    //   findChildren(chainRoot, connections),
    // ),
    nodes,
    edges,
  };
};

export default buildFlowData;
