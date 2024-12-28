import { Signature } from "../generated/graphql-operations";

export const findSigByEveId = (
  eveId: string,
  signatures: Signature[],
): Signature | undefined => signatures.find((sig) => sig.eveId === eveId);
