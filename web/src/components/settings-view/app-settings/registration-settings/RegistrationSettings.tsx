import { Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import FullsizeControl from "../../settings-grid/FullsizeControl";
import SettingsGroup from "../../settings-grid/SettingsGroup";
import SplitRow from "../../settings-grid/SplitRow";
import useAppSettings from "../useAppSettings";
import AllowedAlliances from "./AllowedAlliances";
import AllowedCorporations from "./AllowedCorporations";

const RegistrationSettings = () => {
  const { appSettingsQuery, setRegistrationEnabled } = useAppSettings();

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setRegistrationEnabled(checked);
  };

  return (
    <SettingsGroup title="User Registration" expanded>
      <FullsizeControl
        label="Enable new user registration"
        control={
          <Switch
            color="secondary"
            checked={
              appSettingsQuery.data?.getAppData.settings.registration.enabled
            }
            onChange={toggle}
          />
        }
      />
      <SplitRow>
        <AllowedCorporations />
        <AllowedAlliances />
      </SplitRow>
      <Typography variant="body2">
        If both filters are activated, satisfying one condition (i.e. matching
        corp or alliance) is enough for registration to be allowed. Deactivating
        both filters allows registration using any character.
      </Typography>
    </SettingsGroup>
  );
};

export default RegistrationSettings;
