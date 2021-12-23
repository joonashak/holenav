import MassStatus from "../../../enum/MassStatus";
import SecurityClasses from "../../../enum/SecurityClasses";

export type SystemState = {
  id: string;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  signatures: Signature[];
  wormholes: Wormhole[];
};

export type Signature = {
  id: string;
  eveId: string;
  name: string;
  type: string;
};

export type Wormhole = Signature & {
  eol: boolean;
  destinationName: string | null;
  reverseType: string;
  massStatus: MassStatus;
};
