import { Box, Switch } from "@mui/material";
import { ChangeEvent } from "react";
import FullsizeControl from "../../SettingsGrid/FullsizeControl";
import useAppSettings from "../useAppSettings";
import AllowedAlliancesList from "./AllowedAlliancesList";

const AllowedAlliances = () => {
  const { appSettingsQuery, setAllianceFilterEnabled } = useAppSettings();

  if (!appSettingsQuery.data) {
    return null;
  }

  const { allianceFilterEnabled } =
    appSettingsQuery.data.getAppData.settings.registration;

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    setAllianceFilterEnabled(checked);
  };

  return (
    <Box>
      <FullsizeControl
        label="Restrict registration to members of selected alliances"
        control={
          <Switch
            color="secondary"
            checked={allianceFilterEnabled}
            onChange={toggle}
          />
        }
      />
      <AllowedAlliancesList />
    </Box>
  );
};

export default AllowedAlliances;
