// Adapted from https://mui.com/material-ui/react-menu/#context-menu
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, ReactNode, useState } from "react";
import { SignatureOld, SigType } from "../../../../../generated/graphqlOperations";
import TableRow from "../../../../common/TableRow";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSignatures from "../../../SystemData/useSignatures";

type SigContextMenuProps = {
  children: ReactNode;
  signature: SignatureOld;
};

const SigContextMenu = ({ children, signature }: SigContextMenuProps) => {
  const { signatures, updateSignatures, deleteSignatures } = useSignatures();
  const { showErrorNotification } = useNotification();

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

  const holesWithoutIds = signatures.filter((sig) => sig.type === SigType.Wormhole && !sig.eveId);
  const returnConnectionWithoutId = holesWithoutIds.length === 1 ? holesWithoutIds[0] : null;

  const enabled = returnConnectionWithoutId && signature.eveId && !signature.wormholeType;

  const markSigAsReturnWormhole = async () => {
    if (!returnConnectionWithoutId) {
      showErrorNotification("Could not figure out what signature to link.");
      handleClose();
      return;
    }
    await deleteSignatures([signature.id]);
    await updateSignatures([
      { eveId: signature.eveId, id: returnConnectionWithoutId.id, type: SigType.Wormhole },
    ]);
    handleClose();
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
        <MenuItem onClick={markSigAsReturnWormhole} disabled={!enabled}>
          Mark {signature.eveId} as Return Wormhole
        </MenuItem>
      </Menu>
    </TableRow>
  );
};

export default SigContextMenu;
