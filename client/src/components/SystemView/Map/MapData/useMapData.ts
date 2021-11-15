import { Downgraded, useState } from "@hookstate/core";
import { mapState } from ".";

export default () => {
  const state = useState(mapState);

  return {
    get connectionTree() {
      return {
        rootSystemName: state.connectionTree.nested("rootSystemName").get(),
        children: state.connectionTree.nested("children").attach(Downgraded).get(),
      };
    },
  };
};
