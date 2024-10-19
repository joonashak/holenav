import { RawNodeDatum } from "react-d3-tree";
import {
  FindConnectionGraphQuery,
  GraphConnection,
} from "../../../../generated/graphqlOperations";

/** Recursive factory to build tree from flat connection node list. */
const findChildren = (
  start: GraphConnection,
  connections: GraphConnection[],
): RawNodeDatum => {
  // Remove reverse connection to prevent traversing backwards through it.
  const connectionsWithoutReverse = connections.filter(
    (conn) => conn.id !== start.reverse,
  );

  const directChildren = connectionsWithoutReverse.filter(
    (conn) => start.to && conn.from === start.to,
  );

  if (directChildren.length === 0) {
    return {
      name: start.to || "",
      children: [],
    };
  }

  return {
    name: start.to || "",
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
  if (!data || data.findConnectionGraph.chains.length === 0) {
    return { name: from, children: [] };
  }

  const { chains } = data.findConnectionGraph;
  // FIXME: Cleaner way to pass the nodes from backend...
  const connections = chains.length ? chains[0].children : [];

  const chainRoots = connections.filter((conn) => conn.from === from);

  // TODO: Sort children at all levels.
  return {
    name: from,
    children: chainRoots.map((chainRoot) =>
      findChildren(chainRoot, connections),
    ),
  };
};

export default buildConnectionTree;
