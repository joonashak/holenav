import { FetchResult, useLazyQuery, useMutation } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import {
  ADD_SIGNATURE,
  ADD_WORMHOLE,
  DELETE_SIGNATURE,
  DELETE_WORMHOLE,
  EDIT_SIGNATURE,
  EDIT_WORMHOLE,
  GET_SYSTEM_BY_NAME,
} from "./graphql";
import { Signature, Wormhole } from "./types";

export default () => {
  const state = useState(systemState);

  const [changeSystem] = useLazyQuery(GET_SYSTEM_BY_NAME, {
    onCompleted: ({ getSystemByName, getWormholesBySystem }) => {
      const wormholes = getWormholesBySystem;
      state.merge({ ...getSystemByName, wormholes });
    },
  });

  const [addSigMutation] = useMutation(ADD_SIGNATURE, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat([data.addSignature]));
    },
  });

  const addSignature = async (newSig: any) => {
    const existingWh = state.wormholes
      .attach(Downgraded)
      .get()
      .find((wh) => wh.eveId === newSig.eveId);

    if (newSig.eveId && existingWh) {
      await deleteWormhole(existingWh.id);
    }

    const input = { ...newSig, systemId: state.id.value };
    return addSigMutation({ variables: { input } });
  };

  const [updateSigMutation] = useMutation(EDIT_SIGNATURE, {
    onCompleted: (data) => {
      const updatedSig = data.updateSignature;
      state.signatures.set((sigs) =>
        sigs.map((sig) => (sig.id === updatedSig.id ? updatedSig : sig))
      );
    },
  });

  const updateSignature = async (update: Signature): Promise<FetchResult> =>
    updateSigMutation({ variables: { input: update } });

  const [deleteSigMutation] = useMutation(DELETE_SIGNATURE, {
    onCompleted: (data) => {
      const deletedSig = data.deleteSignature;
      state.signatures.set((sigs) => sigs.filter((sig) => sig.id !== deletedSig.id));
    },
  });

  const deleteSignature = async (id: string): Promise<void> => {
    await deleteSigMutation({ variables: { id } });
  };

  const [addWhMutation] = useMutation(ADD_WORMHOLE, {
    onCompleted: (data) => {
      state.wormholes.set((whs) => whs.concat(data.addWormhole));
    },
  });

  const addWormhole = async (newWormhole: any): Promise<FetchResult> => {
    const existingSig = state.signatures
      .attach(Downgraded)
      .get()
      .find((sig) => sig.eveId === newWormhole.eveId);

    if (newWormhole.eveId && existingSig) {
      await deleteSignature(existingSig.id);
    }

    return addWhMutation({ variables: { input: newWormhole } });
  };

  const [updateWhMutation] = useMutation(EDIT_WORMHOLE, {
    onCompleted: (data) => {
      const updatedWh = data.updateWormhole;
      state.wormholes.set((whs) => whs.map((wh) => (wh.id === updatedWh.id ? updatedWh : wh)));
    },
  });

  const updateWormhole = async (update: Wormhole): Promise<FetchResult> =>
    updateWhMutation({ variables: { input: update } });

  const [deleteWhMutation] = useMutation(DELETE_WORMHOLE, {
    onCompleted: (data) => {
      const deletedWh = data.deleteWormhole;
      state.wormholes.set((whs) => whs.filter((wh) => wh.id !== deletedWh.id));
    },
  });

  const deleteWormhole = async (id: string): Promise<void> => {
    await deleteWhMutation({ variables: { id } });
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
    get signatures() {
      return state.signatures.attach(Downgraded).get();
    },
    get wormholes() {
      return state.wormholes.attach(Downgraded).get();
    },
    changeSystem,
    addSignature,
    updateSignature,
    deleteSignature,
    addWormhole,
    updateWormhole,
    deleteWormhole,
  };
};
