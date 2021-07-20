/**
 * Types representing the different (YAML) file formats in EVE's SDE (Static Data Export).
 */
export type SdeSystem = {
  solarSystemID: number;
  security: number;
  secondarySun?: {
    effectBeaconTypeID: number;
  };
};

export type SdeSystemExtended = SdeSystem & {
  regionId: number;
  whClass: number;
};

export type SdeName = {
  itemID: number;
  itemName: string;
};
