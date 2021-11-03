import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Signature, Wormhole } from "../../../SystemData/useSystemData";

type DeleteSigButtonProps = {
  sig: Signature | Wormhole;
};

// TODO: Add confirmation before acual delete.
const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  console.log("asd");

  return (
    <IconButton size="small" aria-label="Delete Signature" data-cy={`delete-sig-${sig.name}`}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteSigButton;
