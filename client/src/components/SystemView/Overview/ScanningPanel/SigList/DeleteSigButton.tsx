import { MouseEvent, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSystemData, { Signature, Wormhole } from "../../../SystemData/useSystemData";
import useNotification from "../../../../GlobalNotification/useNotification";

type DeleteSigButtonProps = {
  sig: Signature | Wormhole;
};

const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  const [anchor, setAnchor] = useState<Element | null>(null);
  const { deleteSignature, deleteWormhole } = useSystemData();
  const { setNotification } = useNotification();
  const isWormhole = Object.keys(sig).includes("eol");

  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.target as Element);
  };

  const onClose = () => {
    setAnchor(null);
  };

  const onConfirm = async () => {
    if (isWormhole) {
      await deleteWormhole(sig.id);
      setNotification("Wormhole deleted.", "success");
    } else {
      await deleteSignature(sig.id);
      setNotification("Signature deleted.", "success");
    }

    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        size="small"
        aria-label="Delete Signature"
        data-cy={`delete-sig-${sig.name}`}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={onClose}>
        <MenuItem onClick={onConfirm} data-cy="confirm-button">
          Confirm
        </MenuItem>
      </Menu>
    </>
  );
};

export default DeleteSigButton;
