const root = "https://esi.evetech.net";

const esiUrls = {
  systemJumps: `${root}/v1/universe/system_jumps`,
  systemKills: `${root}/v2/universe/system_kills`,
  search: (characterId: string) =>
    `${root}/v3/characters/${characterId}/search`,
  corporationPublicInfo: (corporationId: string) =>
    `${root}/v5/corporations/${corporationId}`,
  alliancePublicInfo: (allianceId: string) =>
    `${root}/v4/alliances/${allianceId}`,
};

export default esiUrls;
