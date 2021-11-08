import { useRef, useState } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SpeedDialAction,
  SpeedDialActionProps,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import AddIcon from "@mui/icons-material/Add";
import useUserData from "../../../UserData/useUserData";
import MapMenuItem from "./MapMenuItem";

const SpeedDialMapSelect = (props: SpeedDialActionProps) => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const {
    setSelectedMap,
    settings: { maps },
  } = useUserData();

  const selectMap = (mapId: string) => {
    setSelectedMap(mapId);
    toggleOpen();
  };

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
        {maps.map((map) => (
          <MapMenuItem map={map} selectMap={selectMap} key={`quick-map-select-${map.id}`} />
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
