import useAxios from "axios-hooks";
import esiUrls from "./esiUrls";

type EsiSystemJumpsHook = {
  getJumpsBySystem: (systemId: number) => number;
};

const useEsiSystemJumps = (): EsiSystemJumpsHook => {
  const [{ data }] = useAxios(esiUrls.systemJumps);

  const getJumpsBySystem = (systemId: number) => {
    if (!data) {
      return 0;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.find((system: any) => system.system_id === systemId)?.ship_jumps || 0;
  };

  return {
    getJumpsBySystem,
  };
};

export default useEsiSystemJumps;
