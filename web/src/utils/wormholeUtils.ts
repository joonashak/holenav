import wormholes from "@eve-data/wormholes";
import { Connection, Maybe, Signature } from "../generated/graphqlOperations";

const isTrueType = (wormholeType: Maybe<string> | undefined) =>
  wormholeType && wormholeType !== "K162";

// FIXME: Remove
/** Get the true type (i.e., not K162) of given wormhole or `null`. */
export const getWormholeTrueType = (sig: Signature): string | null => {
  if (isTrueType(sig.wormholeType)) {
    return sig.wormholeType || null;
  }

  if (isTrueType(sig.connection?.reverseSignature.wormholeType)) {
    return sig.connection?.reverseSignature.wormholeType || null;
  }

  return null;
};

export const getWormholeProperties = (type: Connection["type"]) =>
  wormholes.find((wh) => wh.type === type);
