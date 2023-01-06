import { Downgraded, useState } from "@hookstate/core";
import { mapState } from ".";
import useAuthenticatedRestApi from "../../../../auth/useAuthenticatedRestApi";
import useUserData from "../../../UserData/useUserData";

export default () => {
  const state = useState(mapState);
  const { settings } = useUserData();
  const { get } = useAuthenticatedRestApi();
  const { selectedMap } = settings;

  const fetchConnectionTree = async (rootSystemNameOverride: string | null = null) => {
    const rootSystemName = rootSystemNameOverride || selectedMap.rootSystemName;

    if (!rootSystemName) {
      return;
    }

    const res = await get(["connection-graph", "connection-tree", rootSystemName].join("/"));
    state.merge({ connectionTree: res.data });
  };

  return {
    get connectionTree() {
      return {
        rootSystemName: state.connectionTree.nested("rootSystemName").get(),
        get children() {
          return state.connectionTree.nested("children").attach(Downgraded).get();
        },
      };
    },
    fetchConnectionTree,
  };
};
