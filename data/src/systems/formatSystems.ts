import { HolenavSystem } from "../types/holenavStaticDataTypes";
import { SdeSystemExtended } from "../types/sdeTypes";

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

export default (
  systems: SdeSystemExtended[],
  systemNames: any
): HolenavSystem[] =>
  systems.map((system) => {
    const { solarSystemID, security, secondarySun, regionId, whClass } = system;
    const name = systemNames[solarSystemID];
    const securityClass = securityClassFromStatus(security);
    const effectId = secondarySun?.effectBeaconTypeID || null;

    return {
      name,
      systemEsiId: solarSystemID,
      securityStatus: security,
      securityClass,
      effectId,
      regionId,
      // Some k-space systems have a wh class set in SDE...
      whClass: securityClass === SecurityClass.Wormhole ? whClass : null,
    };
  });
