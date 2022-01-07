import { Typography } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoTable from "./EffectInfoTable";
import SystemActivityStats from "./SystemActivityStats";
import SystemInfoTitle from "./SystemInfoTitle";

export default () => {
  const { effect } = useSystemData();

  return (
    <OverviewPanel name="system-info" title={<SystemInfoTitle />} defaultExpanded>
      <Typography>Region, effects, activity stats, etc.</Typography>
      <EffectInfoTable effect={effect} />
      <SystemActivityStats />
    </OverviewPanel>
  );
};
