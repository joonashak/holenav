// Adapted from https://mui.com/material-ui/react-menu/#context-menu
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, ReactNode, useState } from "react";
import TableRow from "../../../../common/TableRow";

type SigContextMenuProps = {
  children: ReactNode;
};

const SigContextMenu = ({ children }: SigContextMenuProps) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <TableRow
      hideLastSeparator
      onContextMenu={handleContextMenu}
      style={{ cursor: "context-menu" }}
    >
      {children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={handleClose}>Mark as Return Wormhole</MenuItem>
      </Menu>
    </TableRow>
  );
};

export default SigContextMenu;
