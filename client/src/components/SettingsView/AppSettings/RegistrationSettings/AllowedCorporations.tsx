import {
  Box,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Switch,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import useAppSettings from "../useAppSettings";

const AllowedCorporations = () => {
  const { appSettingsQuery, setCorporationFilterEnabled } = useAppSettings();

  if (!appSettingsQuery.data) {
    return null;
  }

  const { corporationFilterEnabled, allowedCorporations } =
    appSettingsQuery.data.getAppData.settings.registration;

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
      <List>
        {!allowedCorporations.length && <ListItem>Empty list</ListItem>}
        {allowedCorporations.map((esiId) => (
          <ListItem key={`allowed-corp-item-${esiId}`}>{esiId}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllowedCorporations;
