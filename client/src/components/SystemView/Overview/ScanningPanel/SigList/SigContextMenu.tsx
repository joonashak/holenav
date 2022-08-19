// Adapted from https://mui.com/material-ui/react-menu/#context-menu
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, ReactNode, useState } from "react";
import { Signature } from "../../../../../generated/graphqlOperations";
import TableRow from "../../../../common/TableRow";
import useSignatures from "../../../SystemData/useSignatures";

type SigContextMenuProps = {
  children: ReactNode;
  signature: Signature;
};

const SigContextMenu = ({ children, signature }: SigContextMenuProps) => {
  const { deleteSignatures: deleteSignature } = useSignatures();
  // FIXME:
  // const { wormholes, updateWormhole } = useWormholes();
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

  /* FIXME:
  const holesWithoutIds = wormholes.filter((wh) => !wh.eveId);
  const returnConnectionWithoutId = holesWithoutIds.length === 1 ? holesWithoutIds[0] : null;

  const markSigAsReturnWormhole = async () => {
    if (!returnConnectionWithoutId) {
      handleClose();
      return;
    }
    await deleteSignature(signature.id);
    await updateWormhole({ eveId: signature.eveId, id: returnConnectionWithoutId.id });
    handleClose();
  };
  */

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
        {/* FIXME:
        <MenuItem onClick={markSigAsReturnWormhole} disabled={!returnConnectionWithoutId}>
          Mark {signature.eveId} as Return Wormhole
        </MenuItem>
      */}
      </Menu>
    </TableRow>
  );
};

export default SigContextMenu;
