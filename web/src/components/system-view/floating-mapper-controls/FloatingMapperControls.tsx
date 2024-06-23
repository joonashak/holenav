import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import CharacterSelect from "./character-select/CharacterSelect";

const FloatingMapperControls = () => {
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
      <CharacterSelect />
      <IconButton>
        <SettingsIcon sx={{ width: "auto", height: 70 }} />
      </IconButton>
    </Box>
  );
};

export default FloatingMapperControls;
