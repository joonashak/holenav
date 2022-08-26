import { Downgraded, useState } from "@hookstate/core";
import axios from "axios";
import { mapState } from ".";
import { backendUrl } from "../../../../config";
import useUserData from "../../../UserData/useUserData";

export default () => {
  const state = useState(mapState);
  const { settings } = useUserData();
  const { selectedMap } = settings;

  const fetchConnectionTree = async () => {
    const { rootSystemName } = selectedMap;
    const res = await axios.get(
      [backendUrl, "connection-graph", "connection-tree", rootSystemName].join("/")
    );
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
