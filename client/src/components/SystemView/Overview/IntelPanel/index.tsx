import { Typography } from "@material-ui/core";
import OverviewPanel from "../OverviewPanel";

export default () => (
  <OverviewPanel
    name="intel"
    title={
      <>
        <Typography>Intel: 2 structures</Typography>
      </>
    }
  >
    <Typography>Structures, notes, etc.</Typography>
  </OverviewPanel>
);
