import SettingsIcon from "@mui/icons-material/Settings";
import { SpeedDial } from "@mui/material";
import SpeedDialCharacterSelect from "./speed-dial-character-select/SpeedDialCharacterSelect";
import SpeedDialMapSelect from "./speed-dial-map-select/SpeedDialMapSelect";

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
