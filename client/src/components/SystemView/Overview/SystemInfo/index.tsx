import { Box } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoAccordion from "./EffectInfoAccordion";
import SystemActivityStats from "./SystemActivityStats";
import SystemInfoTitle from "./SystemInfoTitle";

export default () => {
  const { whClass } = useSystemData();

  return (
    <OverviewPanel name="system-info" panelTitle={<SystemInfoTitle />} defaultExpanded>
      <Box sx={{ mx: 1 }}>
        {!whClass && <SystemActivityStats />}
        {whClass && <EffectInfoAccordion />}
      </Box>
    </OverviewPanel>
  );
};
