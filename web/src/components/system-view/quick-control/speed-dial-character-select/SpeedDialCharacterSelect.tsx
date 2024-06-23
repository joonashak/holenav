import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SpeedDialAction,
  SpeedDialActionProps,
} from "@mui/material";
import { useRef, useState } from "react";
import { backendUrl } from "../../../../config";
import useLocalData from "../../../local-data/useLocalData";
import useUserData from "../../../user-data/useUserData";
import CharacterMenuItem from "./CharacterMenuItem";

const SpeedDialCharacterSelect = (props: SpeedDialActionProps) => {
  const { main, alts } = useUserData();
  const { setActiveCharacter } = useLocalData();
  const anchorEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const selectCharacter = (esiId: string) => () => {
    setActiveCharacter(esiId);
    toggleMenu();
  };

  if (!main) {
    return null;
  }

  return (
    <>
      <SpeedDialAction
        {...props}
        onClick={toggleMenu}
        icon={<GroupIcon ref={anchorEl} />}
        tooltipTitle="Select Character"
      />
      <Menu
        open={menuOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={toggleMenu}
        MenuListProps={{ sx: { bgcolor: "primary.main" }, dense: true }}
      >
        <CharacterMenuItem
          character={main}
          selectCharacter={selectCharacter(main.esiId)}
        />
        {!!alts.length && <Divider />}
        {alts.map((alt) => (
          <CharacterMenuItem
            character={alt}
            selectCharacter={selectCharacter(alt.esiId)}
            key={`quick-character-select-${alt.esiId}`}
          />
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            window.location.href = `${backendUrl}/sso/login`;
          }}
        >
          <ListItemIcon>
            <AddIcon sx={{ color: "secondary.light" }} />
          </ListItemIcon>
          <ListItemText>Add Character</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SpeedDialCharacterSelect;