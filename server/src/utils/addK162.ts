import { CreatableSignature } from "../entities/signature/dto/add-signatures.dto";
import SigType from "../entities/signature/enums/sig-type.enum";
import { Signature } from "../entities/signature/signature.model";

/**
 * Add K162 wormhole type to either side's signature if applicable.
 */
export const addK162 = <T extends CreatableSignature | Signature>(signature: T): T => {
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
