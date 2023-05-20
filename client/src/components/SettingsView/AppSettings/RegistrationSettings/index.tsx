import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettingsData from "../AppSettingsData/useAppSettingsData";

const RegistrationSettings = () => {
  const { registration } = useAppSettingsData();

  const toggle = (_: ChangeEvent, checked: boolean) => {
    console.log(checked);
    console.log("toggle");
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          label="New User Registration Enabled"
          control={<Checkbox color="secondary" checked={registration.enabled} onChange={toggle} />}
        />
      </FormGroup>
    </Box>
  );
};

export default RegistrationSettings;
