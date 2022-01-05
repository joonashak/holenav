import { Typography } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoTable from "./EffectInfoTable";
import SystemInfoSummary from "./SystemInfoSummary";

export default () => {
  const { effect } = useSystemData();

  return (
    <OverviewPanel name="system-info" title={<SystemInfoSummary />} defaultExpanded>
      <Typography>Region, effects, activity stats, etc.</Typography>
      <EffectInfoTable effect={effect} />
    </OverviewPanel>
  );
};
