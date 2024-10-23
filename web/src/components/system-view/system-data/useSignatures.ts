/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  CreateSignature,
  CreateSignaturesDocument,
  FindConnectionGraphDocument,
  GetSignaturesDocument,
  PasteSignaturesDocument,
  PastedSignature,
  Signature,
} from "../../../generated/graphqlOperations";
import useActiveFolder from "../../../hooks/useActiveFolder";
import useCurrentSystemName from "../useCurrentSystemName";
import { systemState } from "./SystemData";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemName">;

const useSignatures = () => {
  const systemName = useCurrentSystemName();
  const state = useState(systemState);
  const { activeFolderId: folderId } = useActiveFolder();

  const { data }: any = useQuery(GetSignaturesDocument, {
    variables: { systemName, folderId },
  });
  const signatures: Signature[] = data?.getSignaturesBySystem || [];

  const [_createSignatures] = useMutation(CreateSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument, FindConnectionGraphDocument],
  });

  const createSignatures = (signatures: CreateSignature[]) =>
    _createSignatures({ variables: { signatures, folderId } });

  const updateSignatures = async () => {
    // TODO:
  };

  const deleteSignatures = async (): Promise<void> => {};

  const [pasteSigsMutation] = useMutation(PasteSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument],
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
    deleteSignatures,
    pasteSignatures,
  };
};

export default useSignatures;
