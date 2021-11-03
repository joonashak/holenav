import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSystemData, { Signature, Wormhole } from "../../../SystemData/useSystemData";

type DeleteSigButtonProps = {
  sig: Signature | Wormhole;
};

// TODO: Add confirmation before acual delete.
const DeleteSigButton = ({ sig }: DeleteSigButtonProps) => {
  const { deleteSignature } = useSystemData();

  const onClick = async () => {
    await deleteSignature(sig.id);
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
