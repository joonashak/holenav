import { Box, List, ListItem } from "@mui/material";
import { useState } from "react";
import { EsiSearchCategories } from "../../../../services/esi/types";
import useEsiCorporation from "../../../../services/esi/useEsiCorporation";
import useEsiSearch from "../../../../services/esi/useEsiSearch";
import DebouncingAutocomplete from "../../../common/DebouncingAutocomplete";
import useAppSettings from "../useAppSettings";

type CorpOption = {
  esiId: number;
  name: string;
  ticker: string;
};

const AllowedCorporationsList = () => {
  const { appSettingsQuery } = useAppSettings();
  const { getSearchResult } = useEsiSearch();
  const { getPublicInfo } = useEsiCorporation();
  const [options, setOptions] = useState<CorpOption[]>([]);

  if (!appSettingsQuery.data) {
    return null;
  }

  const { allowedCorporations } = appSettingsQuery.data.getAppData.settings.registration;

  const search = async (search: string) => {
    const searchResult = await getSearchResult(search, [EsiSearchCategories.CORPORATION]);
    const visibleResults = await Promise.all(
      searchResult.corporation.slice(0, 10).map(async (corporationId) => {
        const { name, ticker } = await getPublicInfo(corporationId);
        return {
          esiId: corporationId,
          name,
          ticker,
          label: `${name} [${ticker}]`,
        };
      }),
    );
    setOptions(visibleResults);
  };

  return (
    <Box>
      <DebouncingAutocomplete<CorpOption>
        label="Add Corporation"
        options={options}
        optionLabelKey="label"
        optionValueKey="esiId"
        onChange={() => {}}
        search={search}
      />
      <List>
        {!allowedCorporations.length && <ListItem>Empty list</ListItem>}
        {allowedCorporations.map((esiId) => (
          <ListItem key={`allowed-corp-item-${esiId}`}>{esiId}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllowedCorporationsList;
