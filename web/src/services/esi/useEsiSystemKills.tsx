import useAxios from "axios-hooks";
import esiUrls from "./esiUrls";
import { EsiSystemKills } from "./types";

type EsiSystemKillsHook = {
  getKillsBySystem: (systemId: number) => EsiSystemKills;
};

const useEsiSystemKills = (): EsiSystemKillsHook => {
  const [{ data }] = useAxios(esiUrls.systemKills);

  const defaultKills = {
    npcKills: 0,
    podKills: 0,
    shipKills: 0,
  };

  const getKillsBySystem = (systemId: number) => {
    if (!data) {
      return defaultKills;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = data.find((system: any) => system.system_id === systemId);

    return {
      npcKills: res?.npc_kills || 0,
      podKills: res?.pod_kills || 0,
      shipKills: res?.ship_kills || 0,
    };
  };

  return {
    getKillsBySystem,
  };
};

export default useEsiSystemKills;
