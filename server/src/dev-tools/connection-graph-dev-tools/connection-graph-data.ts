import MassStatus from "../../entities/connection/mass-status.enum";
import { CreateMapDto } from "../../entities/map/dto/create-map.dto";
import { CreateSignature } from "../../entities/signature/dto/create-signature.dto";
import SigType from "../../entities/signature/enums/sig-type.enum";

export type ConnectionGraphData = CreateMapDto & {
  signatures: CreateSignature[];
};

const wh = (
  eveId: string,
  name: string,
  type: string | null,
  from: string,
  to: string | null = null,
  { k162 = false, eol = false, massStatus = MassStatus.STABLE } = {},
): CreateSignature => ({
  type: SigType.WORMHOLE,
  systemName: from,
  eveId,
  name,
  connection: {
    type,
    from,
    to,
    k162,
    eol,
    massStatus,
  },
});

const data = (
  eveId: string,
  systemName: string,
  name = "",
): CreateSignature => ({
  type: SigType.DATA,
  systemName,
  eveId,
  name,
  connection: null,
});

const relic = (
  eveId: string,
  systemName: string,
  name = "",
): CreateSignature => ({
  type: SigType.RELIC,
  systemName,
  eveId,
  name,
  connection: null,
});

const gas = (
  eveId: string,
  systemName: string,
  name = "",
): CreateSignature => ({
  type: SigType.GAS,
  systemName,
  eveId,
  name,
  connection: null,
});

const unkn = (
  eveId: string,
  systemName: string,
  name = "",
): CreateSignature => ({
  type: SigType.UNKNOWN,
  systemName,
  eveId,
  name,
  connection: null,
});

export const connectionGraphData: ConnectionGraphData[] = [
  {
    name: "Small Tree",
    rootSystemName: "J111141",
    signatures: [
      data("JEI-927", "J111141"),
      relic("OIE-128", "J111141", "Ruined Sansha Monument Site"),
      gas("RWE-573", "J111141"),
      unkn("JSO-882", "J111141"),
      data("NPQ-852", "J222822"),
      data("EEE-078", "J222822"),
      wh("NOW-820", "D2A NOW", "D382", "J111141", "J222822"),
      wh("OAS-842", "ALA OAS", "A239", "J111141", "Tama"),
      wh("WNG-020", "", null, "J111141"),
      wh("OSN-543", "D3B OSN", "O477", "J222822"),
      wh("SSO-384", "DHB SSO", "B274", "J222822", "Sobaseki", { eol: true }),
      wh("HHW-710", "DLC HHW", "B449", "Sobaseki", "Ahbazon", {
        k162: true,
        massStatus: MassStatus.CRIT,
      }),
    ],
  },
];
