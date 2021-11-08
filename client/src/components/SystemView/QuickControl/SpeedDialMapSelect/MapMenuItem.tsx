import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { SavedMap } from "../../../UserData/types";
import useUserData from "../../../UserData/useUserData";

type MapMenuItemProps = {
  map: SavedMap;
  selectMap: (mapId: string) => void;
};

const MapMenuItem = ({ map, selectMap }: MapMenuItemProps) => {
  const { id, name } = map;
  const {
    settings: { selectedMap },
  } = useUserData();

  const selected = map.id === selectedMap.id;

  return (
    <MenuItem onClick={() => selectMap(id)}>
      <ListItemIcon>{selected ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
      <ListItemText sx={{ marginRight: 2 }}>{name}</ListItemText>
      <DeleteIcon />
    </MenuItem>
  );
};

export default MapMenuItem;
