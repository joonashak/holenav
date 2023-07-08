const root = "https://esi.evetech.net";

const esiUrls = {
  systemJumps: `${root}/v1/universe/system_jumps`,
  systemKills: `${root}/v2/universe/system_kills`,
  search: (characterId: string) => `${root}/v3/characters/${characterId}/search/`,
};

export default esiUrls;
