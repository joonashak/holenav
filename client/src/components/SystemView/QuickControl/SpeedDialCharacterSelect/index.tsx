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
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import useUserData from "../../../UserData/useUserData";
import CharacterMenuItem from "./CharacterMenuItem";
import useLocalData from "../../../LocalData/useLocalData";
import { AddCharacterDocument } from "../../../../generated/graphqlOperations";
import useLazyAuthenticatedQuery from "../../../../auth/useLazyAuthenticatedQuery";

const SpeedDialCharacterSelect = (props: SpeedDialActionProps) => {
  const { main, alts } = useUserData();
  const { setActiveCharacter } = useLocalData();
  const anchorEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [ssoLoginQuery] = useLazyAuthenticatedQuery(AddCharacterDocument, {
    onCompleted: ({ addCharacter }) => {
      window.location.href = addCharacter.ssoLoginUrl;
    },
  });

  const addCharacter = () => ssoLoginQuery();

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
        <CharacterMenuItem character={main} selectCharacter={selectCharacter(main.esiId)} />
        {!!alts.length && <Divider />}
        {alts.map((alt) => (
          <CharacterMenuItem
            character={alt}
            selectCharacter={selectCharacter(alt.esiId)}
            key={`quick-character-select-${alt.esiId}`}
          />
        ))}
        <Divider />
        <MenuItem onClick={addCharacter}>
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
