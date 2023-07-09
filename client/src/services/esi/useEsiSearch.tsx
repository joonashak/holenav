import axios from "axios";
import useSsoTokens from "../../auth/useSsoTokens";
import esiUrls from "./esiUrls";
import { EsiSearchCategories, EsiSearchResult } from "./types";

const useEsiSearch = () => {
  const { getSsoTokens } = useSsoTokens();

  const getSearchResult = async (
    search: string,
    categories: EsiSearchCategories[],
  ): Promise<EsiSearchResult> => {
    if (!getSsoTokens.data) {
      return Object.fromEntries(
        Object.values(EsiSearchCategories).map((cat) => [cat, []]),
      ) as unknown as EsiSearchResult;
    }

    const { accessToken, esiId } = getSsoTokens.data.getSsoTokens.main;
    const url = esiUrls.search(esiId);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        categories: categories.join(),
        search: search,
      },
    });

    // The result object returned by ESI only includes fields for categories
    // that have matches. Add empty categories for a nicer return value.
    Object.values(EsiSearchCategories).forEach((cat: string) => {
      if (!Object.keys(res.data).includes(cat)) {
        res.data[cat] = [];
      }
    });

    return res.data;
  };

  return {
    getSearchResult,
  };
};

export default useEsiSearch;
