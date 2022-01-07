import { Box } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoTable from "./EffectInfoTable";
import SystemActivityStats from "./SystemActivityStats";
import SystemInfoTitle from "./SystemInfoTitle";

export default () => {
  const { effect } = useSystemData();

  return (
    <OverviewPanel name="system-info" panelTitle={<SystemInfoTitle />} defaultExpanded>
      <Box sx={{ mx: 1 }}>
        <SystemActivityStats />
        <EffectInfoTable effect={effect} />
      </Box>
    </OverviewPanel>
  );
};
