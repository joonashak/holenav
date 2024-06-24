import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { sortBy } from "lodash";
import { useState } from "react";
import { GetMyUserPreferencesDocument } from "../../../../generated/graphqlOperations";
import useSelectedCharacter from "../../../../hooks/useSelectedCharacter";

const CharacterSelect = () => {
  const { data } = useQuery(GetMyUserPreferencesDocument);
  const { selectedCharacter, setSelectedCharacterEveId } =
    useSelectedCharacter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectCharacter = (id: number) => {
    setSelectedCharacterEveId(id);
    closeMenu();
  };

  if (!data || !selectedCharacter) {
    return null;
  }

  const altsSorted = sortBy(data.getMyUserPreferences.user.alts, "name");
  const characters = [data.getMyUserPreferences.user.main].concat(altsSorted);

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        {selectedCharacter.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={closeMenu}
      >
        {characters.map((char) => (
          <MenuItem
            key={char.eveId}
            onClick={() => selectCharacter(char.eveId)}
            selected={char.eveId === selectedCharacter.eveId}
            sx={{
              "&.Mui-selected": { bgcolor: "primary.main" },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={char.name}
                src={`https://images.evetech.net/characters/${char.eveId}/portrait?size=128`}
              />
            </ListItemAvatar>
            <ListItemText>
              <Box>{char.name}</Box>
              <Typography
                variant="overline"
                sx={{ lineHeight: 0, textTransform: "none", color: grey[600] }}
              >
                {char.corporation.name}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CharacterSelect;
