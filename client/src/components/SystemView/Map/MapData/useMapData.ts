import { Downgraded, useState } from "@hookstate/core";
import { mapState } from ".";
import useLazyAuthenticatedQuery from "../../../../auth/useLazyAuthenticatedQuery";
import { ConnectionTreeDocument } from "../../../../generated/graphqlOperations";
import useUserData from "../../../UserData/useUserData";

export default () => {
  const state = useState(mapState);
  const { settings } = useUserData();
  const { selectedMap } = settings;

  const [connectionTreeQuery] = useLazyAuthenticatedQuery(ConnectionTreeDocument, {
    variables: { rootSystem: selectedMap?.rootSystemName },
    onCompleted: (data) => {
      console.log(data.getConnectionTree);
      state.merge({ connectionTree: data.getConnectionTree });
    },
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
