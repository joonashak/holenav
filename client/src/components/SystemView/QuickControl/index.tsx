import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GroupIcon from "@mui/icons-material/Group";
import MapIcon from "@mui/icons-material/Map";

const QuickControl = () => {
  console.log("asd");

  return (
    <SpeedDial
      ariaLabel="Quick Control Panel"
      sx={{ position: "absolute", top: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      direction="left"
    >
      <SpeedDialAction icon={<GroupIcon />} tooltipTitle="Select Character" />
      <SpeedDialAction icon={<MapIcon />} tooltipTitle="Select map" />
    </SpeedDial>
  );
};

export default QuickControl;
