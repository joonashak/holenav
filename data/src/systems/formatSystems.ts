import { HolenavSystem } from "../types/holenavStaticDataTypes";
import { SdeSystem } from "../types/SdeTypes";

enum SecurityClass {
  High = "HIGH",
  Low = "LOW",
  Null = "NULL",
  Wormhole = "WH",
}

const securityClassFromStatus = (securityStatus: number) => {
  const roundedSec = Number(securityStatus.toFixed(1));

  if (roundedSec >= 0.5) {
    return SecurityClass.High;
  }
  if (securityStatus > 0) {
    return SecurityClass.Low;
  }
  if (securityStatus > -0.99) {
    return SecurityClass.Null;
  }
  return SecurityClass.Wormhole;
};

export default (systems: SdeSystem[], systemNames: any): HolenavSystem[] =>
  systems.map((system) => {
    const { solarSystemID, security } = system;
    const name = systemNames[solarSystemID];
    const securityClass = securityClassFromStatus(security);

    return {
      name,
      systemEsiId: solarSystemID,
      securityStatus: security,
      securityClass,
    };
  });
