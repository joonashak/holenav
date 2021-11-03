import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSystemData, { Signature, Wormhole } from "../../../SystemData/useSystemData";
import useNotification from "../../../../GlobalNotification/useNotification";

type DeleteSigButtonProps = {
  sig: Signature | Wormhole;
};

// TODO: Add confirmation before acual delete.
const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  const { deleteSignature, deleteWormhole } = useSystemData();
  const { setNotification } = useNotification();
  const isWormhole = Object.keys(sig).includes("eol");

  const onClick = async () => {
    if (isWormhole) {
      await deleteWormhole(sig.id);
      setNotification("Wormhole deleted.", "success");
    } else {
      await deleteSignature(sig.id);
      setNotification("Signature deleted.", "success");
    }
  };

  return (
    <IconButton
      onClick={onClick}
      size="small"
      aria-label="Delete Signature"
      data-cy={`delete-sig-${sig.name}`}
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteSigButton;
