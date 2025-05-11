import MassStatus from "../../entities/connection/mass-status.enum";
import { CreateMapDto } from "../../entities/map/dto/create-map.dto";
import { CreateSignature } from "../../entities/signature/dto/create-signature.dto";
import SigType from "../../entities/signature/enums/sig-type.enum";

export type ConnectionGraphData = CreateMapDto & {
  signatures: CreateSignature[];
};

export const connectionGraphData: ConnectionGraphData[] = [
  {
    name: "asd",
    rootSystemName: "Jita",
    signatures: [
      {
        type: SigType.DATA,
        systemName: "Jita",
        eveId: "DSA",
        name: "",
        connection: null,
      },
      {
        type: SigType.WORMHOLE,
        systemName: "Jita",
        eveId: "FFF",
        name: "hole",
        connection: {
          type: "C140",
          from: "Jita",
          to: "Amarr",
          k162: false,
          eol: false,
          massStatus: MassStatus.STABLE,
        },
      },
    ],
  },
];
