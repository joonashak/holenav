import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";
import AllowedAlliancesList from "./AllowedAlliancesList";

const AllowedAlliances = () => {
  const { appSettingsQuery, setAllianceFilterEnabled } = useAppSettings();

  if (!appSettingsQuery.data) {
    return null;
  }

  const { allianceFilterEnabled } = appSettingsQuery.data.getAppData.settings.registration;

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setAllianceFilterEnabled(checked);
  };

  return (
    <Box>
      <Typography variant="h3">Allowed Alliances</Typography>
      <Typography variant="body2">
        Restrict new user registration to allow characters from the listed alliances.
      </Typography>
      <FormGroup>
        <FormControlLabel
          label="Activate filter"
          control={<Switch color="secondary" checked={allianceFilterEnabled} onChange={toggle} />}
        />
      </FormGroup>
      <AllowedAlliancesList />
    </Box>
  );
};

export default AllowedAlliances;
