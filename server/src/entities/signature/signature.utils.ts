import { get, set } from "lodash";
import { addUuid } from "../../utils/addUuid";
import { CreatableSignature } from "./dto/add-signatures.dto";
import MassStatus from "./enums/mass-status.enum";
import SigType from "./enums/sig-type.enum";
import { Signature, SignatureWithoutConnection } from "./signature.model";

export const isWormhole = (signature: { type: SigType }) =>
  signature.type === SigType.WORMHOLE;

export const addUuidToSignatureAndReverseSignature = (
  signature: Signature | CreatableSignature,
): Signature | SignatureWithoutConnection => {
  const sigWithUuid = addUuid(signature, { overwrite: true });

  if (sigWithUuid.connection?.reverseSignature) {
    sigWithUuid.connection.reverseSignature = addUuid(
      sigWithUuid.connection.reverseSignature,
      {
        overwrite: true,
      },
    );
  }

  return sigWithUuid;
};

/** Add K162 wormhole type to either side's signature if applicable. */
export const addK162 = <T extends CreatableSignature | Signature>(
  signature: T,
): T => {
  if (signature.type !== SigType.WORMHOLE) {
    return signature;
  }

  const k162 = "K162";
  const { wormholeType } = signature;
  const { wormholeType: reverseWhType } = signature.connection.reverseSignature;

  if (wormholeType && wormholeType !== k162) {
    signature.connection.reverseSignature.wormholeType = k162;
    return signature;
  }

  if (reverseWhType && reverseWhType !== k162) {
    signature.wormholeType = k162;
    return signature;
  }

  return signature;
};

const addEmptyConnection = (
  signature: CreatableSignature,
): CreatableSignature => ({
  wormholeType: "",
  ...signature,
  connection: {
    eol: false,
    massStatus: MassStatus.STABLE,
    reverseSignature: {
      eveId: "",
      name: "",
      systemName: "",
      type: SigType.WORMHOLE,
      wormholeType: "",
    },
  },
});

/**
 * Complete user supplied signature for entering into database.
 *
 * Adds possibly missing connections for wormholes, UUID's and K162's.
 */
export const completeSignature = (
  signature: CreatableSignature,
): Signature | SignatureWithoutConnection => {
  if (signature.type !== SigType.WORMHOLE) {
    return addUuid(signature);
  }

  const whWithConnection = signature.connection
    ? signature
    : addEmptyConnection(signature);
  const whWithIds = addUuidToSignatureAndReverseSignature(whWithConnection);
  const whWithTypes = addK162(whWithIds);

  return whWithTypes;
};

/** Set `connection.eolAt` to now if given sig is an EOL wormhole. */
export const addEolAt = (signature: Signature): Signature => {
  if (signature.type !== SigType.WORMHOLE || !signature.connection.eol) {
    return signature;
  }

  return set(signature, "connection.eolAt", new Date());
};

export const sanitizeSignatureForNeo4j = (signature: Signature) => {
  const dateKeys = ["createdAt", "connection.eolAt"];

  for (const key of dateKeys) {
    const cur = get(signature, key, null) as Date;
    const val = cur?.toISOString() || null;
    set(signature, key, val);
  }

  return signature;
};
