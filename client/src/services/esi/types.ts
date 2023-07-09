export type EsiSystemKills = {
  npcKills: number;
  podKills: number;
  shipKills: number;
};

export enum EsiSearchCategories {
  AGENT = "agent",
  ALLIANCE = "alliance",
  CHARACTER = "character",
  CONSTELLATION = "constellation",
  CORPORATION = "corporation",
  FACTION = "faction",
  INVENTORY_TYPE = "inventory_type",
  REGION = "region",
  SOLAR_SYSTEM = "solar_system",
  STATION = "station",
  STRUCTURE = "structure",
}

export type EsiSearchResult = Record<EsiSearchCategories, number>;
