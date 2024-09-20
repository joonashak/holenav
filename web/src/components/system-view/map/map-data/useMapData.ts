import { Downgraded, useState } from "@hookstate/core";
import axios from "axios";
import { mapState } from "./MapData";

export default () => {
  const state = useState(mapState);
  // FIXME: Use new selected map hook here.
  // const { settings } = useUserData();
  // const { selectedMap } = settings;

  const fetchConnectionTree = async (
    rootSystemNameOverride: string | null = null,
  ) => {
    const rootSystemName = rootSystemNameOverride || "Jita";

    if (!rootSystemName) {
      return;
    }

    const res = await axios.get(
      ["connection-graph", "connection-tree", rootSystemName].join("/"),
    );
    state.merge({ connectionTree: res.data });
  };

  return {
    get connectionTree() {
      return {
        rootSystemName: state.connectionTree.nested("rootSystemName").get(),
        get children() {
          return state.connectionTree
            .nested("children")
            .attach(Downgraded)
            .get();
        },
      };
    },
    fetchConnectionTree,
  };
};
