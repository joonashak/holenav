import { SpeedDial } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDialMapSelect from "./SpeedDialMapSelect";
import SpeedDialCharacterSelect from "./SpeedDialCharacterSelect";

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
      <SpeedDialCharacterSelect FabProps={actionFabProps} />
      <SpeedDialMapSelect FabProps={actionFabProps} />
    </SpeedDial>
  );
};

export default QuickControl;
