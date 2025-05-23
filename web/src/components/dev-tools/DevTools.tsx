import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { backendUrl } from "../../config";
import SettingsDialog from "../settings/SettingsDialog";

const DevTools = () => {
  const reset = async () => {
    await axios.get(`${backendUrl}/dev/reset`);
    window.location.href = ".";
  };

  const seed = async () => {
    await axios.get(`${backendUrl}/dev/seed`, {
      withCredentials: true,
    });
    window.location.href = ".";
  };

  return (
    <SettingsDialog title="Developer Tools">
      <Box sx={{ display: "flex", gap: "1rem", mb: 3 }}>
        <Typography variant="caption">
          Clear database. Does not remove users, sessions, or dynamic
          configuration.
        </Typography>
        <Button
          onClick={reset}
          variant="contained"
          color="error"
          sx={{ minWidth: "200px" }}
        >
          Clear Database
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Typography variant="caption">
          Seed connection graphs from test data. Removes all entries in the
          current folder and populates it with the test data.
        </Typography>
        <Button
          onClick={seed}
          variant="contained"
          color="warning"
          sx={{ minWidth: "200px" }}
        >
          Seed Database
        </Button>
      </Box>
    </SettingsDialog>
  );
};

export default DevTools;
