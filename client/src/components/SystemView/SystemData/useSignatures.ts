import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import {
  AddSignaturesDocument,
  DeleteSignaturesDocument,
  Signature,
  SignatureUpdate,
  UpdateSignaturesDocument,
} from "../../../generated/graphqlOperations";

export type AddSignatureHookInput = Omit<Signature, "id" | "folder" | "systemName">;

const useSignatures = () => {
  const state = useState(systemState);

  const [addSigMutation] = useAuthenticatedMutation(AddSignaturesDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat(data.addSignatures));
    },
  });

  const addSignatures = async (newSigs: AddSignatureHookInput[]) => {
    const signatures = newSigs.map((sig) => ({
      ...sig,
      systemName: state.name.get(),
    }));
    return addSigMutation({ variables: { input: { signatures } } });
  };

  const [updateSigMutation] = useAuthenticatedMutation(UpdateSignaturesDocument, {
    onCompleted: (data) => {
      const updatedSig = data.updateSignature;
      state.signatures.set((sigs) =>
        sigs.map((sig) => (sig.id === updatedSig.id ? updatedSig : sig))
      );
    },
  });

  const updateSignature = async (update: SignatureUpdate): Promise<FetchResult> =>
    updateSigMutation({ variables: { input: update } });

  const [deleteSigMutation] = useAuthenticatedMutation(DeleteSignaturesDocument, {
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
    addSignatures,
    updateSignature,
    deleteSignature,
  };
};

export default useSignatures;
