import MassStatus from "../../entities/wormhole/massStatus.enum";

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

  // Amarr chain.
  {
    name: "Sarum Prime",
    destinationName: "Sarum Prime",
    systemName: "Amarr",
  },
  {
    name: "Hama",
    destinationName: "Hama",
    systemName: "Sarum Prime",
  },
  {
    name: "Bagodan",
    destinationName: "Bagodan",
    systemName: "Hama",
  },
  {
    name: "Merz",
    destinationName: "Merz",
    systemName: "Bagodan",
  },
  {
    name: "Sirkahri",
    destinationName: "Sirkahri",
    systemName: "Merz",
  },
  {
    name: "Galeh",
    destinationName: "Galeh",
    systemName: "Sirkahri",
  },
  {
    name: "Madimal",
    destinationName: "Madimal",
    systemName: "Galeh",
  },
  {
    name: "Jambu",
    destinationName: "Jambu",
    systemName: "Madimal",
  },
  {
    name: "Warouh",
    destinationName: "Warouh",
    systemName: "Jambu",
  },
  {
    name: "Murema",
    destinationName: "Murema",
    systemName: "Warouh",
  },
  // Proper demo chain (J104809).
  {
    name: "E4A ABC",
    eveId: "DEM-001",
    destinationName: "J222125",
    systemName: "J104809",
    type: "E175",
  },
  {
    name: "FLA DEF",
    eveId: "DEM-002",
    destinationName: "Orfold",
    systemName: "J104809",
    type: "C140",
    massStatus: MassStatus.DESTAB,
  },
  {
    name: "E2B GHI",
    eveId: "DEM-003",
    destinationName: "J114835",
    systemName: "J222125",
    type: "L005",
  },
  {
    name: "E3B PQR",
    eveId: "DEM-004",
    destinationName: "J112709",
    systemName: "J222125",
    type: "C247",
  },
  {
    name: "E4B STU",
    eveId: "DEM-005",
    destinationName: "J165308",
    systemName: "J222125",
    type: "X877",
  },
  {
    name: "EHC JKL",
    eveId: "DEM-006",
    destinationName: "Conoban",
    systemName: "J114835",
    type: "B274",
  },
  {
    name: "E3C MNO",
    eveId: "DEM-007",
    destinationName: "",
    systemName: "J114835",
    type: "O477",
    eol: true,
  },
  {
    name: "E1C VWX",
    eveId: "DEM-008",
    destinationName: "",
    systemName: "J165308",
    type: "P060",
  },
  {
    name: "",
    eveId: "DEM-009",
    destinationName: "J104809",
    systemName: "1-SMEB",
    type: "N432",
    massStatus: MassStatus.CRIT,
    eol: true,
  },
  /*
  {
    name: "",
    destinationName: "",
    systemName: "",
  },
  */
];
