import {
  Box,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import useSelectedMap from "../../../../hooks/useSelectedMap";

const MapSelect = () => {
  const { selectedMap, setSelectedMapId, maps } = useSelectedMap();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectMap = (id: string) => {
    setSelectedMapId(id);
    closeMenu();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        {selectedMap?.name || "Map not selected"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={closeMenu}
      >
        {maps.map((map) => (
          <MenuItem
            key={map.id}
            onClick={() => selectMap(map.id)}
            selected={map.id === selectedMap?.id}
            sx={{
              "&.Mui-selected": { bgcolor: "primary.main" },
            }}
          >
            <ListItemText>
              <Box>{map.name}</Box>
              <Typography
                variant="overline"
                sx={{ lineHeight: 0, textTransform: "none", color: grey[600] }}
              >
                {map.rootSystemName}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MapSelect;
