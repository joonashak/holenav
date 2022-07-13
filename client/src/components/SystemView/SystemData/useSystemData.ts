import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import useLazyAuthenticatedQuery from "../../../auth/useLazyAuthenticatedQuery";
import {
  AddSignatureDocument,
  AddWormholeDocument,
  Signature,
  UpdateWormholeInput,
} from "../../../generated/graphqlOperations";
import {
  DELETE_SIGNATURE,
  DELETE_WORMHOLE,
  EDIT_SIGNATURE,
  EDIT_WORMHOLE,
  GET_SYSTEM_BY_NAME,
} from "./graphql";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemId" | "name">;

export default () => {
  const state = useState(systemState);

  const [changeSystem] = useLazyAuthenticatedQuery(GET_SYSTEM_BY_NAME, {
    onCompleted: ({ getSystemByName, getWormholesBySystem }) => {
      const wormholes = getWormholesBySystem;
      state.merge({ ...getSystemByName, wormholes });
    },
  });

  const [addSigMutation] = useAuthenticatedMutation(AddSignatureDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat(data.addSignatures));
    },
  });

  const addSignature = async (newSig: AddSignatureHookInput) => {
    const existingWh = state.wormholes
      .attach(Downgraded)
      .get()
      .find((wh) => wh.eveId === newSig.eveId);

    if (newSig.eveId && existingWh) {
      await deleteWormhole(existingWh.id);
    }

    const input = { signatures: [newSig], systemId: state.id.value };
    return addSigMutation({ variables: { input } });
  };

  const [updateSigMutation] = useAuthenticatedMutation(EDIT_SIGNATURE, {
    onCompleted: (data) => {
      const updatedSig = data.updateSignature;
      state.signatures.set((sigs) =>
        sigs.map((sig) => (sig.id === updatedSig.id ? updatedSig : sig))
      );
    },
  });

  const updateSignature = async (update: Signature): Promise<FetchResult> =>
    updateSigMutation({ variables: { input: update } });

  const [deleteSigMutation] = useAuthenticatedMutation(DELETE_SIGNATURE, {
    onCompleted: (data) => {
      const deletedSig = data.deleteSignature;
      state.signatures.set((sigs) => sigs.filter((sig) => sig.id !== deletedSig.id));
    },
  });

  /**
   * Delete signature. Also handles wormholes.
   */
  const deleteSignature = async (id: string): Promise<void> => {
    const isWormhole = state.wormholes
      .attach(Downgraded)
      .get()
      .find((wh) => wh.id === id);

    if (isWormhole) {
      await deleteWormhole(id);
      return;
    }

    await deleteSigMutation({ variables: { id } });
  };

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

    if (newWormhole.eveId && existingSig) {
      await deleteSignature(existingSig.id);
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

  const getAllSigs = () => {
    const signatures = state.signatures.attach(Downgraded).get();
    const wormholes = state.wormholes.attach(Downgraded).get();
    return signatures.concat(wormholes as Signature[]);
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
    get allSigs() {
      return getAllSigs();
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
    addSignature,
    updateSignature,
    deleteSignature,
    addWormhole,
    updateWormhole,
    deleteWormhole,
  };
};
