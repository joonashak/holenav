import { Box, Switch } from "@mui/material";
import { ChangeEvent } from "react";
import FullsizeControl from "../../SettingsGrid/FullsizeControl";
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
      <FullsizeControl
        label="Restrict registration to members of selected corporations"
        control={<Switch color="secondary" checked={corporationFilterEnabled} onChange={toggle} />}
      />
      <AllowedCorporationsList />
    </Box>
  );
};

export default AllowedCorporations;
