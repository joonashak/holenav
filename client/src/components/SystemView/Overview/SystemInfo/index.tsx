import { Typography } from "@mui/material";
import OverviewPanel from "../OverviewPanel";
import SystemInfoSummary from "./SystemInfoSummary";

export default () => (
  <OverviewPanel name="system-info" title={<SystemInfoSummary />}>
    <Typography>Region, effects, activity stats, etc.</Typography>
  </OverviewPanel>
);
