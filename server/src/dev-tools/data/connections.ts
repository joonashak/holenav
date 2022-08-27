import SigType from "../../entities/signature/enums/sig-type.enum";

export const connectedSystems = [
  {
    name: "Jita",
  },
  {
    name: "Ikuchi",
  },
  {
    name: "Ansila",
  },
  {
    name: "Dodixie",
  },
  {
    name: "Hek",
  },
  {
    name: "Amarr",
  },
  // 2nd chain
  {
    name: "Maurasi",
  },
  {
    name: "Tama",
  },
];

export const signatures = [
  {
    eveId: "WHL-100",
    type: SigType.WORMHOLE,
    systemName: "Jita",
  },
  {
    eveId: "WHL-101",
    type: SigType.WORMHOLE,
    systemName: "Jita",
  },
  {
    eveId: "WHL-200",
    type: SigType.WORMHOLE,
    systemName: "Ikuchi",
  },
  {
    eveId: "WHL-201",
    type: SigType.WORMHOLE,
    systemName: "Ikuchi",
  },
  {
    eveId: "WHL-300",
    type: SigType.WORMHOLE,
    systemName: "Ansila",
  },
  {
    eveId: "WHL-301",
    type: SigType.WORMHOLE,
    systemName: "Ansila",
  },
  {
    eveId: "WHL-302",
    type: SigType.WORMHOLE,
    systemName: "Ansila",
  },
  {
    eveId: "WHL-400",
    type: SigType.WORMHOLE,
    systemName: "Dodixie",
  },
  {
    eveId: "WHL-500",
    type: SigType.WORMHOLE,
    systemName: "Amarr",
  },
  {
    eveId: "WHL-600",
    type: SigType.WORMHOLE,
    systemName: "Hek",
  },
  {
    eveId: "DAT-100",
    type: SigType.DATA,
    systemName: "Jita",
  },
  // 2nd chain
  {
    eveId: "WHL-700",
    type: SigType.WORMHOLE,
    systemName: "Maurasi",
  },
  {
    eveId: "WHL-800",
    type: SigType.WORMHOLE,
    systemName: "Tama",
  },
];

// FIXME: This assumes id = eveId which should not be the case after prototyping is done.
export const connections = [
  {
    from: "WHL-100",
    to: "WHL-200",
  },
  {
    from: "WHL-300",
    to: "WHL-201",
  },
  {
    from: "WHL-101",
    to: "WHL-400",
  },
  {
    from: "WHL-301",
    to: "WHL-500",
  },
  {
    from: "WHL-302",
    to: "WHL-600",
  },
  // 2nd chain
  {
    from: "WHL-700",
    to: "WHL-800",
  },
];

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
  // Proper demo chain (J104809).
  {
    name: "E4A ABC",
    eveId: "DEM-001",
    destinationName: "J222125",
    systemName: "J104809",
    wormholeType: "E175",
  },
  {
    name: "FLA DEF",
    eveId: "DEM-002",
    destinationName: "Orfrold",
    systemName: "J104809",
    wormholeType: "C140",
    massStatus: MassStatus.DESTAB,
  },
  {
    name: "E2B GHI",
    eveId: "DEM-003",
    destinationName: "J114835",
    systemName: "J222125",
    wormholeType: "L005",
  },
  {
    name: "E3B PQR",
    eveId: "DEM-004",
    destinationName: "J112709",
    systemName: "J222125",
    wormholeType: "C247",
  },
  {
    name: "E4B STU",
    eveId: "DEM-005",
    destinationName: "J165308",
    systemName: "J222125",
    wormholeType: "X877",
  },
  {
    name: "EHC JKL",
    eveId: "DEM-006",
    destinationName: "Conoban",
    systemName: "J114835",
    wormholeType: "B274",
  },
  {
    name: "E3C MNO",
    eveId: "DEM-007",
    destinationName: "",
    systemName: "J114835",
    wormholeType: "O477",
    eol: true,
  },
  {
    name: "E1C VWX",
    eveId: "DEM-008",
    destinationName: "",
    systemName: "J165308",
    wormholeType: "P060",
  },
  {
    name: "",
    eveId: "DEM-009",
    destinationName: "J104809",
    systemName: "1-SMEB",
    wormholeType: "N432",
    massStatus: MassStatus.CRIT,
    eol: true,
  },
];
  */
