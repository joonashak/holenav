import MassStatus from "../../entities/connection/mass-status.enum";
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
    wormholeType: "E175",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "J222125",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "FLA DEF",
    eveId: "DEM-002",
    systemName: "J104809",
    type: SigType.WORMHOLE,
    wormholeType: "C140",
    connection: {
      eol: false,
      massStatus: MassStatus.DESTAB,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "Orfrold",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "E2B GHI",
    eveId: "DEM-003",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    wormholeType: "L005",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "J114835",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "E3B PQR",
    eveId: "DEM-004",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    wormholeType: "C247",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "J112709",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "E4B STU",
    eveId: "DEM-005",
    systemName: "J222125",
    type: SigType.WORMHOLE,
    wormholeType: "X877",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "J165308",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "EHC JKL",
    eveId: "DEM-006",
    systemName: "J114835",
    type: SigType.WORMHOLE,
    wormholeType: "B274",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "Conoban",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "E3C MNO",
    eveId: "DEM-007",
    systemName: "J114835",
    type: SigType.WORMHOLE,
    wormholeType: "O477",
    connection: {
      eol: true,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "E1C VWX",
    eveId: "DEM-008",
    systemName: "J165308",
    type: SigType.WORMHOLE,
    wormholeType: "P060",
    connection: {
      eol: false,
      massStatus: MassStatus.STABLE,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
  {
    name: "",
    eveId: "DEM-009",
    systemName: "1-SMEB",
    type: SigType.WORMHOLE,
    wormholeType: "N432",
    connection: {
      eol: true,
      massStatus: MassStatus.CRIT,
      reverseSignature: {
        name: "",
        eveId: "",
        systemName: "J104809",
        type: SigType.WORMHOLE,
        wormholeType: "K162",
      },
    },
  },
];
