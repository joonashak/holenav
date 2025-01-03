import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { FindConnectionGraphDocument } from "../../../generated/graphql-operations";
import useActiveFolder from "../../../hooks/useActiveFolder";
import useSelectedMap from "../../../hooks/useSelectedMap";
import buildFlowData from "./build-flow-data";

const useConnectionData = () => {
  const { selectedMap } = useSelectedMap();
  const root = selectedMap?.rootSystemName || "";
  const { activeFolderId } = useActiveFolder();

  const { data } = useQuery(FindConnectionGraphDocument, {
    variables: { root, folderId: activeFolderId },
    skip: root === "",
  });

  const connectionTree = useMemo(
    () => buildFlowData(selectedMap, data),
    [selectedMap, data],
  );

  return {
    nodes: connectionTree.nodes || [],
    edges: connectionTree.edges || [],
  };
};

export default useConnectionData;
