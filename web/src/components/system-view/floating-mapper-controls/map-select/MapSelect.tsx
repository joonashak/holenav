import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSelectedMap from "../../../../hooks/useSelectedMap";

const MapSelect = () => {
  const navigate = useNavigate();
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

  const openNewMapDialog = () => {
    navigate("new-map");
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
            <ListItemText sx={{ pr: 3 }}>
              <Box>{map.name}</Box>
              <Typography
                variant="overline"
                sx={{ lineHeight: 0, textTransform: "none", color: grey[600] }}
              >
                {map.rootSystemName}
              </Typography>
            </ListItemText>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                navigate("edit-map", { state: { map } });
              }}
            >
              <EditIcon />
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={openNewMapDialog}>
          <ListItemText sx={{ pr: 3 }}>New Map</ListItemText>
          <AddOutlinedIcon />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MapSelect;
