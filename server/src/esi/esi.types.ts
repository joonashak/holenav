export type EsiAlliancePublicInfo = {
  creator_corporation_id: number;
  creator_id: number;
  date_founded: string;
  executor_corporation_id?: number;
  faction_id?: number;
  name: string;
  ticker: string;
};

export type EsiCharacterPortraitUrl = {
  px64x64: string;
  px128x128: string;
  px256x256: string;
  px512x512: string;
};

export type EsiCharacterPublicInfo = {
  alliance_id?: number;
  birthday: string;
  bloodline_id: number;
  corporation_id: number;
  description?: string;
  faction_id?: number;
  gender: string;
  name: string;
  race_id: number;
  security_status?: number;
  title?: string;
};

export type EsiCorporationPublicInfo = {
  alliance_id?: number;
  ceo_id: number;
  creator_id: number;
  date_founded?: string;
  description?: string;
  faction_id?: number;
  home_station_id?: number;
  member_count: number;
  name: string;
  shares?: number;
  tax_rate: number;
  ticker: string;
  url?: string;
  war_eligible?: boolean;
};
