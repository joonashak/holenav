import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";

const AllowedCorporations = () => {
  const { appSettingsQuery, setCorporationFilterEnabled } = useAppSettings();

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
            <Switch
              color="secondary"
              checked={
                appSettingsQuery.data?.getAppData.settings.registration.corporationFilterEnabled
              }
              onChange={toggle}
            />
          }
        />
      </FormGroup>
    </Box>
  );
};

export default AllowedCorporations;
