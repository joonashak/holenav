import { sortBy } from "lodash";
import {
  FindConnectionGraphQuery,
  GraphConnection,
} from "../../generated/graphql-operations";

let visitedSystems: string[] = [];

/** Recursive factory to build tree from flat connection node list. */
const findChildren = (
  start: GraphConnection,
  connections: GraphConnection[],
): any => {
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

  return {
    name: start.to,
    children: directChildren.map((conn) =>
      findChildren(conn, connectionsWithoutReverse),
    ),
  };
};

/** Build hierarchical connection tree from given root system. */
const buildConnectionTree = (
  from: string,
  data: FindConnectionGraphQuery | undefined,
) => {
  if (!data || data.findConnectionGraph.connections.length === 0) {
    return { name: from, children: [] };
  }

  /**
   * Children may be sorted differently for rendering but when building the tree
   * the original child list should probably be sorted by ID to keep the tree
   * stable (especially when there are loops).
   */
  const connections = sortBy(data.findConnectionGraph.connections, "id");

  const chainRoots = connections.filter((conn) => conn.from === from);

  visitedSystems = [];

  return {
    name: from,
    children: chainRoots.map((chainRoot) =>
      findChildren(chainRoot, connections),
    ),
  };
};

export default buildConnectionTree;
