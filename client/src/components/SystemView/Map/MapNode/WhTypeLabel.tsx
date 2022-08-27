import { Typography } from "@mui/material";
import { useState } from "react";
import { SignatureOld } from "../../../../generated/graphqlOperations";
import SigModal from "../../Overview/ScanningPanel/SigModal";

type WhTypeLabelProps = {
  type: string | undefined;
  signature: SignatureOld | undefined;
};

const WhTypeLabel = ({ type, signature }: WhTypeLabelProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <Typography variant="caption" onClick={toggleModal}>
        {type}
      </Typography>
      <SigModal open={modalOpen} onClose={toggleModal} signature={signature} />
    </>
  );
};

export default WhTypeLabel;
