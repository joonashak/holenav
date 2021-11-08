import { SpeedDial, SpeedDialAction } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDialMapSelect from "./SpeedDialMapSelect";

const QuickControl = () => {
  const actionFabProps = {
    sx: {
      bgcolor: "secondary.dark",
      "&:hover": { bgcolor: "secondary.main" },
    },
  };

  return (
    <SpeedDial
      ariaLabel="Quick Control Panel"
      direction="left"
      sx={{ position: "absolute", top: 16, right: 16 }}
      icon={<SettingsIcon sx={{ fontSize: 32 }} />}
      FabProps={{
        sx: {
          bgcolor: "primary.main",
          color: "primary.dark",
          "&:hover": { bgcolor: "primary.main" },
        },
      }}
    >
      <SpeedDialAction
        icon={<GroupIcon />}
        tooltipTitle="Select Character"
        FabProps={actionFabProps}
      />
      <SpeedDialMapSelect FabProps={actionFabProps} />
    </SpeedDial>
  );
};

export default QuickControl;
