import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useLazyAuthenticatedQuery from "../../../auth/useLazyAuthenticatedQuery";
import { SystemDocument } from "../../../generated/graphqlOperations";

export default () => {
  const state = useState(systemState);

  const [changeSystem] = useLazyAuthenticatedQuery(SystemDocument, {
    onCompleted: ({ getSystemByName, getSignaturesBySystem }) => {
      state.merge({ ...getSystemByName, signatures: getSignaturesBySystem });
    },
  });

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
