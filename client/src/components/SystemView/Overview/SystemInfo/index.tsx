import { Box, Typography } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoAccordion from "./EffectInfoAccordion";
import StaticConnections from "./StaticConnections";
import SystemActivityStats from "./SystemActivityStats";
import SystemInfoTitle from "./SystemInfoTitle";

const SystemInfo = () => {
  const { whClass, region, constellation } = useSystemData();

  return (
    <OverviewPanel name="system-info" panelTitle={<SystemInfoTitle />} defaultExpanded>
      <Box sx={{ mx: 1 }}>
        <Typography sx={{ mb: 2 }}>
          {region.name} / {constellation.name}
        </Typography>
        {!whClass && <SystemActivityStats />}
        {whClass && <StaticConnections />}
        {whClass && <EffectInfoAccordion />}
      </Box>
    </OverviewPanel>
  );
};

export default SystemInfo;
