import { IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Character } from "../../../UserData/types";

type CharacterMenuItemProps = {
  character: Character;
  selectCharacter: (esiId: string) => void;
};

const CharacterMenuItem = ({ character, selectCharacter }: CharacterMenuItemProps) => {
  const { name, esiId } = character;
  const selected = false;

  return (
    <MenuItem onClick={() => selectCharacter(esiId)}>
      <ListItemIcon>
        {selected ? <CheckIcon sx={{ color: "secondary.light" }} /> : null}
      </ListItemIcon>
      <ListItemText
        sx={{ marginRight: 2, color: selected ? "secondary.light" : "primary.contrastText" }}
      >
        {name}
      </ListItemText>
      <IconButton size="small">
        <DeleteIcon />
      </IconButton>
    </MenuItem>
  );
};

export default CharacterMenuItem;
