import { WormholeEffect } from "@eve-data/systems/lib/src/api/system.type";
import MassStatus from "../../../enum/MassStatus";
import SecurityClasses from "../../../enum/SecurityClasses";

export type SystemState = {
  id: string;
  eveId: number;
  name: string;
  securityClass: SecurityClasses;
  securityStatus: number;
  whClass: number | null;
  effect: WormholeEffect | null;
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
