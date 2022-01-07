import useAxios from "axios-hooks";
import esiUrls from "./esiUrls";
import { EsiSystemJump } from "./types";

type EsiSystemJumpsHook = {
  allSystemJumps: EsiSystemJump[];
  getJumpsBySystem: (systemId: number) => number;
};

const useEsiSystemJumps = (): EsiSystemJumpsHook => {
  const [{ data }] = useAxios(esiUrls.systemJumps);

  const getJumpsBySystem = (systemId: number) => {
    if (!data) {
      return 0;
    }

    return data.find((system: any) => system.system_id === systemId)?.ship_jumps || 0;
  };

  return {
    allSystemJumps: data || [],
    getJumpsBySystem,
  };
};

export default useEsiSystemJumps;
