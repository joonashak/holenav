import SigType from "./sig-type.enum";
import { Signature } from "./signature.model";

export const isWormhole = (signature: Signature) => signature.type === SigType.WORMHOLE;
