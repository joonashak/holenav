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

  const { data, loading } = useQuery(FindConnectionGraphDocument, {
    variables: { root, folderId: activeFolderId },
    skip: root === "",
  });

  const connectionTree = useMemo(() => {
    if (!data || loading) {
      return {
        nodes: [],
        edges: [],
      };
    }
    return buildFlowData(selectedMap, data);
  }, [selectedMap, data, loading]);

  // console.log("data", data);

  return {
    nodes: connectionTree.nodes || [],
    edges: connectionTree.edges || [],
  };
};

export default useConnectionData;
