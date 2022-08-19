import { MouseEvent, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useNotification from "../../../../GlobalNotification/useNotification";
import { Signature } from "../../../../../generated/graphqlOperations";
import useSignatures from "../../../SystemData/useSignatures";

type DeleteSigButtonProps = {
  sig: Signature;
};

const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  const [anchor, setAnchor] = useState<Element | null>(null);
  const { deleteSignatures } = useSignatures();
  const { showSuccessNotification } = useNotification();

  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.target as Element);
  };

  const onClose = () => {
    setAnchor(null);
  };

  const onConfirm = async () => {
    await deleteSignatures([sig.id]);
    showSuccessNotification("Signature deleted.");

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
