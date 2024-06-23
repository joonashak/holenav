import { useLazyQuery } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import {
  SystemDocument,
  SystemQuery,
  SystemQueryVariables,
} from "../../../generated/graphqlOperations";
import useSelectedFolder from "../../../hooks/useSelectedFolder";
import { systemState } from "./SystemData";

export default () => {
  const state = useState(systemState);
  const { selectedFolderId } = useSelectedFolder();

  const [changeSystemQuery] = useLazyQuery<SystemQuery, SystemQueryVariables>(
    SystemDocument,
    {
      onCompleted: ({ getSystemByName }) => {
        if (!getSystemByName) {
          return;
        }
        state.merge({ ...getSystemByName });
      },
    },
  );

  const changeSystem = (name: string) => {
    state.merge({ name });
    changeSystemQuery({ variables: { name, folderId: selectedFolderId } });
  };

  return {
    get id() {
      return state.id.get();
    },
    get eveId() {
      return state.eveId.get();
    },
    get name() {
      return state.name.get();
    },
    get securityClass() {
      return state.securityClass.get();
    },
    get securityStatus() {
      return state.securityStatus.get();
    },
    get whClass() {
      return state.whClass.get();
    },
    get effect() {
      return state.effect.get();
    },
    get region() {
      return state.region.get();
    },
    get constellation() {
      return state.constellation.get();
    },
    get staticConnections() {
      return state.staticConnections.attach(Downgraded).get();
    },
    changeSystem,
  };
};
