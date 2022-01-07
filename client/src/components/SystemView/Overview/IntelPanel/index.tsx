import { Typography } from "@mui/material";
import OverviewPanel from "../OverviewPanel";

export default () => (
  <OverviewPanel
    name="intel"
    panelTitle={
      <>
        <Typography variant="h3">Intel: 2 structures</Typography>
      </>
    }
  >
    <Typography>Structures, notes, etc.</Typography>
  </OverviewPanel>
);
