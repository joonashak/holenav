import { Box, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";
import AllowedAlliances from "./AllowedAlliances";
import AllowedCorporations from "./AllowedCorporations";

const RegistrationSettings = () => {
  const { appSettingsQuery, setRegistrationEnabled } = useAppSettings();

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setRegistrationEnabled(checked);
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          label="Enable New User Registration"
          control={
            <Switch
              color="secondary"
              checked={appSettingsQuery.data?.getAppData.settings.registration.enabled}
              onChange={toggle}
            />
          }
        />
      </FormGroup>
      <AllowedCorporations />
      <AllowedAlliances />
      <Typography variant="body2">
        If both filters are activated, satisfying one condition (i.e. matching corp or alliance) is
        enough for registration to be allowed. Deactivating both filters allows registration using
        any character.
      </Typography>
    </Box>
  );
};

export default RegistrationSettings;
