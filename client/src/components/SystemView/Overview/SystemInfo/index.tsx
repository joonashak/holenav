import { Typography } from "@material-ui/core";
import OverviewPanel from "../OverviewPanel";
import SystemInfoSummary from "./SystemInfoSummary";

export default () => (
  <OverviewPanel name="system-info" title={<SystemInfoSummary />}>
    <Typography>Region, effects, activity stats, etc.</Typography>
  </OverviewPanel>
);
