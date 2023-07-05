import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";

const RegistrationSettings = () => {
  const { appSettingsQuery, setRegistrationEnabled } = useAppSettings();

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setRegistrationEnabled(checked);
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          label="New User Registration Enabled"
          control={
            <Checkbox
              color="secondary"
              checked={appSettingsQuery.data?.getAppData.settings.registration.enabled}
              onChange={toggle}
            />
          }
        />
      </FormGroup>
    </Box>
  );
};

export default RegistrationSettings;
