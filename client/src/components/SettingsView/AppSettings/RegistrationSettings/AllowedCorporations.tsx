import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";
import AllowedCorporationsList from "./AllowedCorporationsList";

const AllowedCorporations = () => {
  const { appSettingsQuery, setCorporationFilterEnabled } = useAppSettings();

  if (!appSettingsQuery.data) {
    return null;
  }

  const { corporationFilterEnabled } = appSettingsQuery.data.getAppData.settings.registration;

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setCorporationFilterEnabled(checked);
  };

  return (
    <Box>
      <Typography variant="h3">Allowed Corporations</Typography>
      <Typography variant="body2">
        Restrict new user registration to allow characters from the listed corporations.
      </Typography>
      <FormGroup>
        <FormControlLabel
          label="Activate filter"
          control={
            <Switch color="secondary" checked={corporationFilterEnabled} onChange={toggle} />
          }
        />
      </FormGroup>
      <AllowedCorporationsList />
    </Box>
  );
};

export default AllowedCorporations;
