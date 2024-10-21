import { Box } from "@mui/material";
import CharacterSelect from "./character-select/CharacterSelect";
import MapSelect from "./map-select/MapSelect";
import SettingsMenu from "./SettingsMenu";

const FloatingMapperControls = () => {
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
      <MapSelect />
      <CharacterSelect />
      <SettingsMenu />
    </Box>
  );
};

export default FloatingMapperControls;
