/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import {
  AddSignaturesDocument,
  CreatableSignature,
  DeleteSignaturesDocument,
  GetSignaturesDocument,
  PasteSignaturesDocument,
  PastedSignature,
  Signature,
  UpdateSignaturesDocument,
  UpdateableSignature,
} from "../../../generated/graphqlOperations";
import { stripGraphQlTypenames } from "../../../utils/stripGraphQlTypenames";
import useCurrentSystemName from "../useCurrentSystemName";
import { systemState } from "./SystemData";

export type AddSignatureHookInput = Omit<Signature, "id" | "systemName">;

const useSignatures = () => {
  const systemName = useCurrentSystemName();
  const state = useState(systemState);

  const { data }: any = useQuery(GetSignaturesDocument, {
    variables: { systemName },
  });
  const signatures: Signature[] = data?.getSignaturesBySystem || [];

  const [addSigsMutation] = useMutation(AddSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument],
  });

  const addSignatures = async (newSigs: CreatableSignature[]) => {
    const signatures = newSigs.map((sig) => ({
      ...sig,
      systemName: state.name.get(),
    }));
    return addSigsMutation({ variables: { input: { signatures } } });
  };

  const [updateSigsMutation] = useMutation(UpdateSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument],
  });

  const updateSignatures = async (signatures: UpdateableSignature[]) =>
    updateSigsMutation({
      variables: {
        input: { signatures: signatures.map(stripGraphQlTypenames) },
      },
    });

  const [deleteSigsMutation] = useMutation(DeleteSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument],
  });

  const deleteSignatures = async (ids: string[]): Promise<void> => {
    await deleteSigsMutation({ variables: { input: { ids } } });
  };

  const [pasteSigsMutation] = useMutation(PasteSignaturesDocument, {
    refetchQueries: [GetSignaturesDocument],
  });

  const pasteSignatures = async (
    pastedSignatures: PastedSignature[],
    deleteMissingSigs = false,
  ) =>
    pasteSigsMutation({
      variables: {
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
