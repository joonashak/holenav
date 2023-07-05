import { useState } from "@hookstate/core";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { appSettingsState } from "../AppSettingsData";
import useAppSettingsData from "../AppSettingsData/useAppSettingsData";

const RegistrationSettings = () => {
  const { registration, setRegistrationEnabled } = useAppSettingsData();
  const state = useState(appSettingsState);

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    await setRegistrationEnabled(checked);
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          label="New User Registration Enabled"
          control={<Checkbox color="secondary" checked={true} onChange={toggle} />}
        />
      </FormGroup>
    </Box>
  );
};

export default RegistrationSettings;
