import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import buildConnectionTree from "../components/map/build-connection-tree";
import { FindConnectionGraphDocument } from "../generated/graphql-operations";
import useActiveFolder from "./useActiveFolder";
import useSelectedMap from "./useSelectedMap";

const useConnectionData = () => {
  const { selectedMap } = useSelectedMap();
  const root = selectedMap?.rootSystemName || "";
  const { activeFolderId } = useActiveFolder();

  const { data } = useQuery(FindConnectionGraphDocument, {
    variables: { root, folderId: activeFolderId },
    skip: root === "",
  });

  const connectionTree = useMemo(
    () => buildConnectionTree(root, data),
    [root, data],
  );

  return { connectionTree };
};

export default useConnectionData;
