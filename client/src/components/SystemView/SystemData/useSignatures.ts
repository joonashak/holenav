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

  const [addSigsMutation] = useAuthenticatedMutation(AddSignaturesDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat(data.addSignatures));
    },
  });

  const addSignatures = async (newSigs: AddSignatureHookInput[]) => {
    const signatures = newSigs.map((sig) => ({
      ...sig,
      systemName: state.name.get(),
    }));
    return addSigsMutation({ variables: { input: { signatures } } });
  };

  const [updateSigsMutation] = useAuthenticatedMutation(UpdateSignaturesDocument, {
    onCompleted: (data) => {
      const updatedSig = data.updateSignature;
      state.signatures.set((sigs) =>
        sigs.map((sig) => (sig.id === updatedSig.id ? updatedSig : sig))
      );
    },
  });

  const updateSignature = async (update: SignatureUpdate): Promise<FetchResult> =>
    updateSigsMutation({ variables: { input: update } });

  const [deleteSigsMutation] = useAuthenticatedMutation(DeleteSignaturesDocument, {
    onCompleted: (data) => {
      const deletedIds = data.deleteSignatures.map((sig: Signature) => sig.id);
      state.signatures.set((sigs) => sigs.filter((sig) => !deletedIds.includes(sig.id)));
    },
  });

  /**
   * Delete signature. Also handles wormholes.
   */
  const deleteSignatures = async (ids: string[]): Promise<void> => {
    await deleteSigsMutation({ variables: { input: { ids } } });
  };

  return {
    get signatures() {
      return state.signatures.attach(Downgraded).get();
    },
    addSignatures,
    updateSignature,
    deleteSignatures,
  };
};

export default useSignatures;
