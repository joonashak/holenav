import SigType from "./enums/sig-type.enum";

export const isWormhole = (signature: { type: SigType }) => signature.type === SigType.WORMHOLE;
