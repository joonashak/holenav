import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import CharacterSelect from "./character-select/CharacterSelect";
import MapSelect from "./map-select/MapSelect";

const FloatingMapperControls = () => {
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
      <MapSelect />
      <CharacterSelect />
      <IconButton>
        <SettingsIcon sx={{ width: "auto", height: 70 }} />
      </IconButton>
    </Box>
  );
};

export default FloatingMapperControls;
