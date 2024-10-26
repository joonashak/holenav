import { useMutation, useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  CreateSignature,
  CreateSignaturesDocument,
  FindConnectionGraphDocument,
  FindSignaturesBySystemDocument,
  PasteSignaturesDocument,
  PastedSignature,
  RemoveSignaturesDocument,
  Signature,
  UpdateSignature,
  UpdateSignaturesDocument,
} from "../../../generated/graphqlOperations";
import useActiveFolder from "../../../hooks/useActiveFolder";
import useCurrentSystemName from "../useCurrentSystemName";
import { systemState } from "./SystemData";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemName">;

const useSignatures = () => {
  const systemName = useCurrentSystemName();
  const state = useState(systemState);
  const { activeFolderId: folderId } = useActiveFolder();

  const { data } = useQuery(FindSignaturesBySystemDocument, {
    variables: { systemName, folderId },
  });
  const signatures = data?.findSignaturesBySystem || [];

  const [_createSignatures] = useMutation(CreateSignaturesDocument, {
    refetchQueries: [
      FindSignaturesBySystemDocument,
      FindConnectionGraphDocument,
    ],
  });

  const createSignatures = (signatures: CreateSignature[]) =>
    _createSignatures({ variables: { signatures, folderId } });

  const [_updateSignatures] = useMutation(UpdateSignaturesDocument, {
    refetchQueries: [
      FindSignaturesBySystemDocument,
      FindConnectionGraphDocument,
    ],
  });

  const updateSignatures = async (updates: UpdateSignature[]) =>
    _updateSignatures({ variables: { updates, folderId } });

  const [_removeSignatures] = useMutation(RemoveSignaturesDocument, {
    refetchQueries: [
      FindSignaturesBySystemDocument,
      FindConnectionGraphDocument,
    ],
  });

  const removeSignatures = async (ids: string[]) =>
    _removeSignatures({ variables: { signatureIds: ids, folderId } });

  const [pasteSigsMutation] = useMutation(PasteSignaturesDocument, {
    refetchQueries: [FindSignaturesBySystemDocument],
  });

  const pasteSignatures = async (
    pastedSignatures: PastedSignature[],
    deleteMissingSigs = false,
  ) =>
    pasteSigsMutation({
      variables: {
        folderId,
        input: {
          pastedSignatures,
          systemName: state.name.get(),
          deleteMissingSigs,
        },
      },
    });

  return {
    signatures,
    createSignatures,
    updateSignatures,
    removeSignatures,
    pasteSignatures,
  };
};

export default useSignatures;
