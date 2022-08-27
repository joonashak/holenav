import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import SigModal from "../SigModal";
import { SignatureOld } from "../../../../../generated/graphqlOperations";

type EditSigButtonProps = {
  signature: SignatureOld;
};

const EditSigButton = ({ signature }: EditSigButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <IconButton
        size="small"
        sx={{ pt: 0, pb: 0 }}
        onClick={toggleModal}
        aria-label="Edit Signature"
        data-cy={`edit-sig-${signature.name}`}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      <SigModal open={modalOpen} onClose={toggleModal} signature={signature} />
    </>
  );
};

export default EditSigButton;
