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
import SaveMapDialog from "../../Map/utils/SaveMapDialog";

const SpeedDialCharacterSelect = (props: SpeedDialActionProps) => {
  const anchorEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDialog = () => setDialogOpen((prev) => !prev);

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
        <Divider />
        <MenuItem onClick={toggleDialog}>
          <ListItemIcon>
            <AddIcon sx={{ color: "secondary.light" }} />
          </ListItemIcon>
          <ListItemText>Add Character</ListItemText>
        </MenuItem>
      </Menu>
      <SaveMapDialog open={dialogOpen} onClose={toggleDialog} />
    </>
  );
};

export default SpeedDialCharacterSelect;
