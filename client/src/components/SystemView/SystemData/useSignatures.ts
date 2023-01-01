import { FetchResult } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import { systemState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import {
  AddSignaturesDocument,
  CreatableSignature,
  DeleteSignaturesDocument,
  PastedSignature,
  PasteSignaturesDocument,
  Signature,
  UpdateableSignature,
  UpdateSignaturesDocument,
} from "../../../generated/graphqlOperations";
import { stripGraphQlTypenames } from "../../../utils/stripGraphQlTypenames";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemName">;

const useSignatures = () => {
  const state = useState(systemState);

  const [addSigsMutation] = useAuthenticatedMutation(AddSignaturesDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) => sigs.concat(data.addSignatures));
    },
  });

  const addSignatures = async (newSigs: CreatableSignature[]) => {
    const signatures = newSigs.map((sig) => ({
      ...sig,
      systemName: state.name.get(),
    }));
    return addSigsMutation({ variables: { input: { signatures } } });
  };

  const [updateSigsMutation] = useAuthenticatedMutation(UpdateSignaturesDocument, {
    onCompleted: (data) => {
      state.signatures.set((sigs) =>
        sigs.map(
          (sig) => data.updateSignatures.find((updated: Signature) => updated.id === sig.id) || sig
        )
      );
    },
  });

  const updateSignatures = async (signatures: UpdateableSignature[]): Promise<FetchResult> =>
    updateSigsMutation({
      variables: { input: { signatures: signatures.map(stripGraphQlTypenames) } },
    });

  const [deleteSigsMutation] = useAuthenticatedMutation(DeleteSignaturesDocument, {
    onCompleted: (data) => {
      const deletedIds = data.deleteSignatures.map((sig: Signature) => sig.id);
      state.signatures.set((sigs) => sigs.filter((sig) => !deletedIds.includes(sig.id)));
    },
  });

  const deleteSignatures = async (ids: string[]): Promise<void> => {
    await deleteSigsMutation({ variables: { input: { ids } } });
  };

  const [pasteSigsMutation] = useAuthenticatedMutation(PasteSignaturesDocument, {
    onCompleted: (data) => {
      if (data.pasteSignatures.length === 0) {
        return;
      }

      const existingIds = state.signatures
        .attach(Downgraded)
        .get()
        .map((sig) => sig.id);

      const newSigs = data.pasteSignatures.filter(
        (sig: Signature) => !existingIds.includes(sig.id)
      );

      state.signatures.set((sigs) => sigs.concat(newSigs));

      if (newSigs.length === data.pasteSignatures.length) {
        return;
      }

      const updatedSigs = data.pasteSignatures.filter((sig: Signature) =>
        existingIds.includes(sig.id)
      );

      state.signatures.set((sigs) =>
        sigs.map((sig) => updatedSigs.find((updated: Signature) => updated.id === sig.id) || sig)
      );
    },
  });

  const pasteSignatures = async (pastedSignatures: PastedSignature[]) =>
    pasteSigsMutation({
      variables: {
        input: {
          pastedSignatures,
          systemName: state.name.get(),
        },
      },
    });

  return {
    get signatures() {
      return state.signatures.attach(Downgraded).get();
    },
    addSignatures,
    updateSignatures,
    deleteSignatures,
    pasteSignatures,
  };
};

export default useSignatures;
