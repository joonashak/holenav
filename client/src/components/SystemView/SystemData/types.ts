import { System, WormholeEffect } from "@eve-data/systems/lib/src/api/system.type";
import SecurityClasses from "../../../enum/SecurityClasses";
import { Signature, Wormhole } from "../../../generated/graphqlOperations";

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
  region: System["region"];
  constellation: System["constellation"];
  staticConnections: System["staticConnections"];
};
