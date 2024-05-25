import { Signature } from "../generated/graphqlOperations";

export const findSigByEveId = (
  eveId: string,
  signatures: Signature[],
): Signature | undefined => signatures.find((sig) => sig.eveId === eveId);
