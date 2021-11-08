import { useRef, useState } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  SpeedDialAction,
  SpeedDialActionProps,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import useUserData from "../../UserData/useUserData";

// TODO: Highlight selected map.

const SpeedDialMapSelect = (props: SpeedDialActionProps) => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const {
    setSelectedMap,
    settings: { maps, selectedMap },
  } = useUserData();

  const selectMap = (mapId: string) => {
    setSelectedMap(mapId);
    toggleOpen();
  };

  const mapIsSelected = (mapId: string) => mapId === selectedMap.id;

  return (
    <>
      <SpeedDialAction
        {...props}
        onClick={toggleOpen}
        icon={<MapIcon ref={anchorEl} />}
        tooltipTitle="Select Map"
      />
      <Menu
        open={open}
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={toggleOpen}
        MenuListProps={{ sx: { bgcolor: "primary.main" } }}
      >
        {maps.map(({ id, name }) => (
          <MenuItem onClick={() => selectMap(id)} key={`quick-map-select-${id}`}>
            <ListItemIcon>{mapIsSelected(id) ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
            <ListItemText sx={{ marginRight: 2 }}>{name}</ListItemText>
            <DeleteIcon />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>New Map</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SpeedDialMapSelect;
