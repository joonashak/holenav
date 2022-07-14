import { MouseEvent, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useNotification from "../../../../GlobalNotification/useNotification";
import { Signature, Wormhole } from "../../../../../generated/graphqlOperations";
import useSignatures from "../../../SystemData/useSignatures";
import useWormholes from "../../../SystemData/useWormholes";

type DeleteSigButtonProps = {
  sig: Signature | Wormhole;
};

const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  const [anchor, setAnchor] = useState<Element | null>(null);
  const { deleteSignature } = useSignatures();
  const { deleteWormhole } = useWormholes();
  const { showSuccessNotification } = useNotification();
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
      showSuccessNotification("Wormhole deleted.");
    } else {
      await deleteSignature(sig.id);
      showSuccessNotification("Signature deleted.");
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
