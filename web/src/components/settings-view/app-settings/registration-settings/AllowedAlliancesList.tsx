import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, IconButton, List, ListItem } from "@mui/material";
import { useState } from "react";
import { EsiSearchCategories } from "../../../../services/esi/types";
import useEsiAlliance from "../../../../services/esi/useEsiAlliance";
import useEsiSearch from "../../../../services/esi/useEsiSearch";
import DebouncingAutocomplete from "../../../common/DebouncingAutocomplete";
import OrganizationListItem from "../../settings-grid/OrganizationListItem";
import Row from "../../settings-grid/Row";
import useAppSettings from "../useAppSettings";

type AllianceOption = {
  esiId: number;
  name: string;
  ticker: string;
};

const AllowedAlliancesList = () => {
  const { appSettingsQuery, addAllowedAlliance } = useAppSettings();
  const { getSearchResult } = useEsiSearch();
  const { getPublicInfo } = useEsiAlliance();
  const [options, setOptions] = useState<AllianceOption[]>([]);
  const [selected, setSelected] = useState<AllianceOption | null>();

  if (!appSettingsQuery.data) {
    return null;
  }

  const { allowedAlliances } =
    appSettingsQuery.data.getAppData.settings.registration;

  const search = async (search: string) => {
    const searchResult = await getSearchResult(search, [
      EsiSearchCategories.ALLIANCE,
    ]);

    const visibleResults = await Promise.all(
      searchResult.alliance.slice(0, 10).map(async (allianceId) => {
        const { name, ticker } = await getPublicInfo(allianceId);

        return {
          esiId: allianceId,
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
      addAllowedAlliance(selected.esiId.toString());
    }
  };

  return (
    <Row sx={{ flexDirection: "column" }} disableHover hideBorder>
      <Box sx={{ display: "flex" }}>
        <DebouncingAutocomplete<AllianceOption>
          label="Add Alliance"
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
      <List sx={{ pb: 0 }}>
        {!allowedAlliances.length && <ListItem>Empty list</ListItem>}
        {allowedAlliances.map((esiId) => (
          <OrganizationListItem
            alliance
            esiId={esiId}
            key={`allowed-alliance-item-${esiId}`}
          />
        ))}
      </List>
    </Row>
  );
};

export default AllowedAlliancesList;
