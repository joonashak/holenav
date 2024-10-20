/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  GetSignaturesDocument,
  PasteSignaturesDocument,
  PastedSignature,
  Signature,
} from "../../../generated/graphqlOperations";
import useSelectedFolder from "../../../hooks/useSelectedFolder";
import useCurrentSystemName from "../useCurrentSystemName";
import { systemState } from "./SystemData";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemName">;

const useSignatures = () => {
  const systemName = useCurrentSystemName();
  const state = useState(systemState);
  const { selectedFolderId: folderId } = useSelectedFolder();

  const { data }: any = useQuery(GetSignaturesDocument, {
    variables: { systemName, folderId },
  });
  const signatures: Signature[] = data?.getSignaturesBySystem || [];

  const addSignatures = async () => {};

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
    addSignatures,
    updateSignatures,
    deleteSignatures,
    pasteSignatures,
  };
};

export default useSignatures;
