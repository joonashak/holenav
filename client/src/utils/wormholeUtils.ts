import wormholes from "@eve-data/wormholes";
import { Signature } from "../generated/graphqlOperations";

const isTrueType = (wormholeType: string | undefined | null) =>
  wormholeType && wormholeType !== "K162";

/**
 * Get the true type (i.e., not K162) of given wormhole or `null`.
 */
export const getWormholeTrueType = (sig: Signature): string | null => {
  if (isTrueType(sig.wormholeType)) {
    return sig.wormholeType || null;
  }

  if (isTrueType(sig.connection?.reverseSignature.wormholeType!)) {
    return sig.connection?.reverseSignature.wormholeType || null;
  }

  return null;
};

export const getWormholeProperties = (type: string | null) =>
  wormholes.find((wh) => wh.type === type);
