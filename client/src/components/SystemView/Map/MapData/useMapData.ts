import { Downgraded, useState } from "@hookstate/core";
import { mapState } from ".";
import useLazyAuthenticatedQuery from "../../../../auth/useLazyAuthenticatedQuery";
import useUserData from "../../../UserData/useUserData";
import { GET_CONNECTION_TREE } from "./graphql";

export default () => {
  const state = useState(mapState);
  const { settings } = useUserData();
  const { selectedMap } = settings;

  const [connectionTreeQuery] = useLazyAuthenticatedQuery(GET_CONNECTION_TREE, {
    variables: { rootSystem: selectedMap?.rootSystemName },
    onCompleted: (data) => state.merge({ connectionTree: data.getConnectionTree }),
    fetchPolicy: "network-only",
  });

  return {
    get connectionTree() {
      return {
        rootSystemName: state.connectionTree.nested("rootSystemName").get(),
        get children() {
          return state.connectionTree.nested("children").attach(Downgraded).get();
        },
      };
    },
    fetchConnectionTree: connectionTreeQuery,
  };
};
