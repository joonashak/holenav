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
  {
    name: "Big Tree",
    rootSystemName: "J100120",
    signatures: [
      // D-chain.
      wh("EFG-925", "D2A EFG", "D364", "J100120", "J155737"),
      wh("UWI-199", "D3B UWI", "O477", "J155737"),
      wh("BNS-724", "DHB BNS", "B274", "J155737", "Chaktaren"),
      // E-chain.
      wh("IHF-972", "E5A IHF", "H296", "J100120", "J114154", { k162: true }),
      wh("ERV-127", "E6B ERV", "V753", "J114154", "J144420"),
      wh("UIO-237", "ENB UIO", "Z142", "J114154", "0ZN7-G"),
      wh("IDN-389", "ENB IDN", "N432", "J114154", "O-N589"),
      wh("WEU-892", "E4B WEU", "H900", "J114154", "J160800", { k162: true }),
      wh("NWE-457", "E5C NWE", "V911", "J144420"),
      wh("IOW-238", "E1C IOW", "P060", "J160800", "J135411"),
      wh("WEF-843", "ELD WEF", "J244", "J135411", "Oyeman"),
      // F-chain.
      wh("ERF-328", "FLA ERF", "C140", "J100120"),
      // G-chain.
      wh("WUI-389", "G5A WUI", "H296", "J100120", "J170540"),
      wh("JIQ-832", "G5B JIQ", "H296", "J170540", "J133440"),
      wh("ORS-569", "G5C ORS", "H296", "J133440", "J103251", { k162: true }),
      wh("EIO-023", "G5C EIO", "H296", "J133440", "J140717"),
      wh("ONI-824", "G2D ONI", "D364", "J140717", "J233555"),
      wh("IER-023", "GHE IER", "N110", "J233555", "Uktiad"),
      wh("IGJ-892", "G1E IGJ", "Z647", "J233555"),
    ],
  },
];
