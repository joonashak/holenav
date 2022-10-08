import MassStatus from "../../entities/signature/enums/mass-status.enum";
import SigType from "../../entities/signature/enums/sig-type.enum";

/*
export default [
  // Jita chain.
  {
    name: "Ikuchi",
    destinationName: "Ikuchi",
    systemName: "Jita",
  },
  {
    name: "Ansila",
    destinationName: "Ansila",
    systemName: "Ikuchi",
  },
  {
    name: "Hykkota",
    destinationName: "Hykkota",
    systemName: "Ansila",
  },
  {
    name: "Maurasi",
    destinationName: "Maurasi",
    systemName: "Jita",
  },
  {
    name: "Urhinichi",
    destinationName: "Urhinichi",
    systemName: "Otanuomi",
  },
];
  */

/*
  {
    name: "",
    eveId: "",
    systemName: "",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "",
      reverseType: "",
    },
  },
  */

export const mainTestChain = [
  {
    name: "E4A ABC",
    eveId: "DEM-001",
    systemName: "J104809",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "E175",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "J222125",
      reverseType: "",
    },
  },
  {
    name: "FLA DEF",
    eveId: "DEM-002",
    systemName: "J104809",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "C140",
      eol: false,
      massStatus: MassStatus.DESTAB,
      destinationName: "Orfrold",
      reverseType: "",
    },
  },
  {
    name: "E2B GHI",
    eveId: "DEM-003",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "L005",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "J114835",
      reverseType: "",
    },
  },
  {
    name: "E3B PQR",
    eveId: "DEM-004",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "C247",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "J112709",
      reverseType: "",
    },
  },
  {
    name: "E4B STU",
    eveId: "DEM-005",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "X877",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "J165308",
      reverseType: "",
    },
  },
  {
    name: "EHC JKL",
    eveId: "DEM-006",
    systemName: "J114835",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "B274",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "Conoban",
      reverseType: "",
    },
  },
  {
    name: "E3C MNO",
    eveId: "DEM-007",
    systemName: "J114835",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "O477",
      eol: true,
      massStatus: MassStatus.STABLE,
      destinationName: "",
      reverseType: "",
    },
  },
  {
    name: "E1C VWX",
    eveId: "DEM-008",
    systemName: "J165308",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "P060",
      eol: false,
      massStatus: MassStatus.STABLE,
      destinationName: "",
      reverseType: "",
    },
  },
  {
    name: "",
    eveId: "DEM-009",
    systemName: "1-SMEB",
    type: SigType.WORMHOLE,
    connection: {
      wormholeType: "N432",
      eol: true,
      massStatus: MassStatus.CRIT,
      destinationName: "J104809",
      reverseType: "",
    },
  },
];
