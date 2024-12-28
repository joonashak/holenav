import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { FindConnectionGraphDocument } from "../../../../generated/graphqlOperations";
import useActiveFolder from "../../../../hooks/useActiveFolder";
import useSelectedMap from "../../../../hooks/useSelectedMap";
import buildConnectionTree from "./build-connection-tree";

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
