import { useMutation, useQuery } from "@apollo/client";
import {
  CreateSignature,
  CreateSignaturesDocument,
  FindConnectionGraphDocument,
  FindSignaturesBySystemDocument,
  PasteSignaturesDocument,
  PastedSignature,
  RemoveSignaturesDocument,
  UpdateSignature,
  UpdateSignaturesDocument,
} from "../../../generated/graphql-operations";
import useActiveFolder from "../../../hooks/useActiveFolder";
import useCurrentSystemName from "../useCurrentSystemName";

const useSignatures = () => {
  const systemName = useCurrentSystemName();
  const { activeFolderId: folderId } = useActiveFolder();

  const refetchQueries = [
    FindSignaturesBySystemDocument,
    FindConnectionGraphDocument,
  ];

  const { data } = useQuery(FindSignaturesBySystemDocument, {
    variables: { systemName, folderId },
  });
  const signatures = data?.findSignaturesBySystem || [];

  const [_createSignatures] = useMutation(CreateSignaturesDocument, {
    refetchQueries,
  });

  const createSignatures = (signatures: CreateSignature[]) =>
    _createSignatures({ variables: { signatures, folderId } });

  const [_updateSignatures] = useMutation(UpdateSignaturesDocument, {
    refetchQueries,
  });

  const updateSignatures = async (updates: UpdateSignature[]) =>
    _updateSignatures({ variables: { updates, folderId } });

  const [_removeSignatures] = useMutation(RemoveSignaturesDocument, {
    refetchQueries,
  });

  const removeSignatures = async (ids: string[]) =>
    _removeSignatures({ variables: { signatureIds: ids, folderId } });

  const [pasteSigsMutation] = useMutation(PasteSignaturesDocument, {
    refetchQueries,
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
          systemName,
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
