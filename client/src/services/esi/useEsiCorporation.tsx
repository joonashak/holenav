import axios from "axios";
import esiUrls from "./esiUrls";
import { EsiCorporationPublicInfo } from "./types";

const useEsiCorporation = () => {
  const getPublicInfo = async (corporationId: number) => {
    const url = esiUrls.corporationPublicInfo(corporationId.toString());
    const res = await axios.get<EsiCorporationPublicInfo>(url);

    return res.data;
  };

  return {
    getPublicInfo,
  };
};

export default useEsiCorporation;
