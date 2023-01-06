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
import { useHistory } from "react-router-dom";
import useUserData from "../../../UserData/useUserData";
import MapMenuItem from "./MapMenuItem";
import SaveMapDialog from "../../Map/utils/SaveMapDialog";
import useMapData from "../../Map/MapData/useMapData";
import { SavedMap } from "../../../../generated/graphqlOperations";

const SpeedDialMapSelect = (props: SpeedDialActionProps) => {
  const anchorEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDialog = () => setDialogOpen((prev) => !prev);

  const {
    setSelectedMap,
    settings: { maps },
  } = useUserData();
  const { fetchConnectionTree } = useMapData();
  const { push } = useHistory();

  const selectMap = async (map: SavedMap) => {
    setSelectedMap(map.id);
    await fetchConnectionTree(map.rootSystemName);
    toggleMenu();
    push(`/system/${map.rootSystemName}`);
  };

  return (
    <>
      <SpeedDialAction
        {...props}
        onClick={toggleMenu}
        icon={<MapIcon ref={anchorEl} />}
        tooltipTitle="Select Map"
      />
      <Menu
        open={menuOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={toggleMenu}
        MenuListProps={{ sx: { bgcolor: "primary.main" }, dense: true }}
      >
        {maps.map((map) => (
          <MapMenuItem map={map} selectMap={selectMap} key={`quick-map-select-${map.id}`} />
        ))}
        <Divider />
        <MenuItem onClick={toggleDialog}>
          <ListItemIcon>
            <AddIcon sx={{ color: "secondary.light" }} />
          </ListItemIcon>
          <ListItemText>New Map</ListItemText>
        </MenuItem>
      </Menu>
      <SaveMapDialog open={dialogOpen} onClose={toggleDialog} />
    </>
  );
};

export default SpeedDialMapSelect;
