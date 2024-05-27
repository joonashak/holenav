import { Typography } from "@mui/material";
import OverviewPanel from "../OverviewPanel";

const IntelPanel = () => (
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

export default IntelPanel;
