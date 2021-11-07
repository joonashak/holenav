import {
  SpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialActionProps,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDialMapSelect from "./SpeedDialMapSelect";

const SpeedDialAction = (props: SpeedDialActionProps) => (
  <MuiSpeedDialAction
    {...props}
    FabProps={{
      sx: {
        bgcolor: "secondary.dark",
        "&:hover": { bgcolor: "secondary.main" },
      },
    }}
  />
);

const QuickControl = () => {
  console.log("asd");

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
      <SpeedDialAction icon={<GroupIcon />} tooltipTitle="Select Character" />
      <SpeedDialMapSelect />
    </SpeedDial>
  );
};

export default QuickControl;
