import axios from "axios";
import useSsoTokens from "../../auth/useSsoTokens";
import esiUrls from "./esiUrls";

const useEsiSearch = () => {
  const { getSsoTokens } = useSsoTokens();

  const getSearchResult = async (query: string) => {
    if (!getSsoTokens.data) {
      return [];
    }

    const { accessToken, esiId } = getSsoTokens.data.getSsoTokens.main;
    const url = esiUrls.search(esiId);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        categories: "corporation",
        search: query,
      },
    });

    return res.data.corporation;
  };

  return {
    getSearchResult,
  };
};

export default useEsiSearch;
