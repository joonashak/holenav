import { useQuery } from "@apollo/client";
import axios from "axios";
import { GetMyTokensDocument } from "../../generated/graphqlOperations";
import esiUrls from "./esiUrls";
import { EsiSearchCategories, EsiSearchResult } from "./types";

const useEsiSearch = () => {
  const { data } = useQuery(GetMyTokensDocument);

  const getSearchResult = async (
    search: string,
    categories: EsiSearchCategories[],
  ): Promise<EsiSearchResult> => {
    if (!data || search.length < 3) {
      return Object.fromEntries(
        Object.values(EsiSearchCategories).map((cat) => [cat, []]),
      ) as unknown as EsiSearchResult;
    }

    const { accessToken, eveId } = data.getMyTokens[0];
    const url = esiUrls.search(eveId);
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
