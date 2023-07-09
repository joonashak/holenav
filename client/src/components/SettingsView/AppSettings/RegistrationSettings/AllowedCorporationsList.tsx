import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, IconButton, List, ListItem } from "@mui/material";
import { useState } from "react";
import { EsiSearchCategories } from "../../../../services/esi/types";
import useEsiCorporation from "../../../../services/esi/useEsiCorporation";
import useEsiSearch from "../../../../services/esi/useEsiSearch";
import DebouncingAutocomplete from "../../../common/DebouncingAutocomplete";
import Row from "../../SettingsGrid/Row";
import useAppSettings from "../useAppSettings";

type CorpOption = {
  esiId: number;
  name: string;
  ticker: string;
};

const AllowedCorporationsList = () => {
  const { appSettingsQuery, addAllowedCorporation } = useAppSettings();
  const { getSearchResult } = useEsiSearch();
  const { getPublicInfo } = useEsiCorporation();
  const [options, setOptions] = useState<CorpOption[]>([]);
  const [selected, setSelected] = useState<CorpOption | null>();

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

  const onClick = () => {
    if (selected) {
      addAllowedCorporation(selected.esiId.toString());
    }
  };

  return (
    <Row sx={{ flexDirection: "column" }} disableHover>
      <Box sx={{ display: "flex" }}>
        <DebouncingAutocomplete<CorpOption>
          label="Add Corporation"
          options={options}
          optionLabelKey="label"
          optionValueKey="esiId"
          onChange={(_, corp) => setSelected(corp)}
          search={search}
          sx={{ flexGrow: 1, mr: 1 }}
          textFieldProps={{ variant: "filled" }}
        />
        <IconButton size="large" color="secondary" onClick={onClick}>
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <List>
        {!allowedCorporations.length && <ListItem>Empty list</ListItem>}
        {allowedCorporations.map((esiId) => (
          <ListItem key={`allowed-corp-item-${esiId}`}>{esiId}</ListItem>
        ))}
      </List>
    </Row>
  );
};

export default AllowedCorporationsList;
