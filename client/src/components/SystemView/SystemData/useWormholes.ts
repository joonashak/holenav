import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { AddWormholeDocument, UpdateWormholeInput } from "../../../generated/graphqlOperations";
import { DELETE_WORMHOLE, EDIT_WORMHOLE } from "./graphql";

const useWormholes = () => {
  const state = useState(systemState);

  const [addWhMutation] = useAuthenticatedMutation(AddWormholeDocument, {
    onCompleted: (data) => {
      state.wormholes.set((whs) => whs.concat(data.addWormholes));
    },
  });

  const addWormhole = async (newWormhole: any): Promise<FetchResult> => {
    const existingSig = state.signatures
      .attach(Downgraded)
      .get()
      .find((sig) => sig.eveId === newWormhole.eveId);

    // FIXME: Remove this hack that makes changing type between sig/wh work.
    if (newWormhole.eveId && existingSig) {
      // await deleteSignature(existingSig.id);
    }

    return addWhMutation({ variables: { input: { wormholes: [newWormhole] } } });
  };

  const [updateWhMutation] = useAuthenticatedMutation(EDIT_WORMHOLE, {
    onCompleted: (data) => {
      const updatedWh = data.updateWormhole;
      state.wormholes.set((whs) => whs.map((wh) => (wh.id === updatedWh.id ? updatedWh : wh)));
    },
  });

  const updateWormhole = async (update: UpdateWormholeInput): Promise<FetchResult> =>
    updateWhMutation({ variables: { input: update } });

  const [deleteWhMutation] = useAuthenticatedMutation(DELETE_WORMHOLE, {
    onCompleted: (data) => {
      const deletedWh = data.deleteWormhole;
      state.wormholes.set((whs) => whs.filter((wh) => wh.id !== deletedWh.id));
    },
  });

  const deleteWormhole = async (id: string): Promise<void> => {
    await deleteWhMutation({ variables: { id } });
  };

  return {
    get wormholes() {
      return state.wormholes.attach(Downgraded).get();
    },
    addWormhole,
    updateWormhole,
    deleteWormhole,
  };
};

export default useWormholes;
