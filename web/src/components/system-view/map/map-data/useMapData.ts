import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { FindConnectionGraphDocument } from "../../../../generated/graphqlOperations";
import useActiveFolder from "../../../../hooks/useActiveFolder";
import useCurrentSystemName from "../../useCurrentSystemName";
import buildConnectionTree from "./build-connection-tree";

const useMapData = () => {
  const root = useCurrentSystemName();
  const { activeFolderId } = useActiveFolder();
  const { data } = useQuery(FindConnectionGraphDocument, {
    variables: { root, folderId: activeFolderId },
  });

  const connectionTree = useMemo(
    () => buildConnectionTree(root, data),
    [root, data],
  );

  return { connectionTree };
};

export default useMapData;
