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

export type EsiCorporationPublicInfo = {
  ceo_id: number;
  creator_id: number;
  date_founded: string;
  description: string;
  home_station_id: number;
  member_count: number;
  name: string;
  shares: number;
  tax_rate: number;
  ticker: string;
  url: string;
  war_eligible: boolean;
};
