import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import {
  AddSignatureDocument,
  Signature,
  SignatureUpdate,
} from "../../../generated/graphqlOperations";
import { DELETE_SIGNATURE, EDIT_SIGNATURE } from "./graphql";

export type AddSignatureHookInput = Omit<Signature, "id" | "folder" | "systemName">;

const useSignatures = () => {
  const state = useState(systemState);

  const [addSigMutation] = useAuthenticatedMutation(AddSignatureDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat(data.addSignatures));
    },
  });

  const addSignature = async (newSig: AddSignatureHookInput) => {
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

  const updateSignature = async (update: SignatureUpdate): Promise<FetchResult> =>
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
    await deleteSigMutation({ variables: { id } });
  };

  return {
    get signatures() {
      return state.signatures.attach(Downgraded).get();
    },
    addSignature,
    updateSignature,
    deleteSignature,
  };
};

export default useSignatures;
