/** Types for the nodes and relations used in Neo4j. */

import MassStatus from "../enums/mass-status.enum";
import SigType from "../enums/sig-type.enum";

export type SystemNode = {
  id: string;
  name: string;
  folderId: string;
  pseudo: boolean;
};

export type SignatureNode = {
  id: string;
  eveId: string;
  type: SigType;
  wormholeType?: string;
  name: string;
};

export type ConnectsRelation = {
  massStatus: MassStatus;
  eol: boolean;
  // TODO: This could (should?) also include wh size info.
};
