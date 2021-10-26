import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import SigModal from "../SigModal";
import { Signature, Wormhole } from "../../../SystemData/useSystemData";

type EditSigButtonProps = {
  sig: Signature | Wormhole;
};

const EditSigButton = ({ sig }: EditSigButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  const isWormhole = Object.keys(sig).includes("eol");
  const wormhole = isWormhole ? (sig as Wormhole) : undefined;
  const signature = !isWormhole ? sig : undefined;

  return (
    <>
      <IconButton
        size="small"
        sx={{ pt: 0, pb: 0 }}
        onClick={toggleModal}
        aria-label="Edit Signature"
        data-cy={`edit-sig-${sig.name}`}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      <SigModal open={modalOpen} onClose={toggleModal} wormhole={wormhole} signature={signature} />
    </>
  );
};

export default EditSigButton;
