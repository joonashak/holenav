import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { AddSignatureDocument, Signature } from "../../../generated/graphqlOperations";
import { DELETE_SIGNATURE, EDIT_SIGNATURE } from "./graphql";
import useWormholes from "./useWormholes";

// FIXME: This is probably wrong. At least name is used thus should not be omitted..?
type AddSignatureHookInput = Omit<Signature, "id" | "systemId" | "name">;

const useSignatures = () => {
  const state = useState(systemState);
  const { deleteWormhole } = useWormholes();

  /**
   * Get all signatures and wormholes in current system.
   *
   * This method is provided for convenience. When working with Wormhole-specific properties,
   * you should use `useWormholes` hook instead of casting some members of this method's
   * return value.
   * @returns Sigs and wormholes cast to `Signature`.
   */
  const getAllSigs = (): Signature[] => {
    const signatures = state.signatures.attach(Downgraded).get();
    const wormholes = state.wormholes.attach(Downgraded).get();
    return signatures.concat(wormholes as Signature[]);
  };

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

    // FIXME: Remove this hack that makes changing type between sig/wh work.
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

  return {
    get signatures() {
      return state.signatures.attach(Downgraded).get();
    },
    get allSigs() {
      return getAllSigs();
    },
    addSignature,
    updateSignature,
    deleteSignature,
  };
};

export default useSignatures;
