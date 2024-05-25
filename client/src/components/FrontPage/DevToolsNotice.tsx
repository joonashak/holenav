import { Paper, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

const DevToolsNotice = () => (
  <Paper
    elevation={5}
    sx={{
      bgcolor: yellow[600],
      color: "primary.dark",
      padding: 2,
      marginTop: 6,
      "&&>*": { marginBottom: 2 },
    }}
  >
    <Typography variant="h3">Dev Tools Are Enabled</Typography>
    <Typography color="primary.dark">
      You can access the development toolbar using the wrench icon in the right
      bottom corner. This allows, e.g., trying out Holenav without having an EVE
      Online account. Please note that the user mocking feature allows anyone to
      mock the admin user and thus access other users&apos; data. You should
      take care not to enter any data that might jeopardize your in-game
      operational security.
    </Typography>
    <Typography color="primary.dark">
      The same guidelines apply when using this instance of Holenav through EVE
      SSO login. Use only such characters that you do not mind leaking the
      information of.
    </Typography>
    <Typography color="primary.dark">
      Feel free to use the <i>Seed Database</i> button to reset into the
      standard testing and development dataset. If something is broken,
      it&apos;s worth a try, and you should probably also reset the data after
      you are done testing.
    </Typography>
  </Paper>
);

export default DevToolsNotice;
