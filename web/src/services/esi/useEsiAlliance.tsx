import axios from "axios";
import esiUrls from "./esiUrls";
import { EsiAlliancePublicInfo } from "./types";

const useEsiAlliance = () => {
  const getPublicInfo = async (allianceId: number) => {
    const url = esiUrls.alliancePublicInfo(allianceId.toString());
    const res = await axios.get<EsiAlliancePublicInfo>(url);

    return res.data;
  };

  return {
    getPublicInfo,
  };
};

export default useEsiAlliance;
