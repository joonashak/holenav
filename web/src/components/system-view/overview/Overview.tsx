import { AppBar, Box, Toolbar } from "@mui/material";
import OverviewTitle from "./OverviewTitle";
import IntelPanel from "./intel-panel/IntelPanel";
import ScanningPanel from "./scanning-panel/ScanningPanel";
import SystemInfo from "./system-info/SystemInfo";

const Overview = () => (
  <Box
    sx={{
      zIndex: 1,
      height: "fit-content",
      width: {
        xs: "100vw",
        sm: "30rem",
      },
    }}
  >
    <AppBar position="static">
      <Toolbar>
        <OverviewTitle />
      </Toolbar>
    </AppBar>
    <SystemInfo />
    <ScanningPanel />
    <IntelPanel />
  </Box>
);

export default Overview;
