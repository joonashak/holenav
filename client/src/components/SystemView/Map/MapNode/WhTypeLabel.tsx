import { Typography } from "@mui/material";
import { useState } from "react";
import SigModal from "../../Overview/ScanningPanel/SigModal";
import { Wormhole } from "../../SystemData/types";

type WhTypeLabelProps = {
  type: string | undefined;
  wormhole: Wormhole | undefined;
};

const WhTypeLabel = ({ type, wormhole }: WhTypeLabelProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <Typography variant="caption" onClick={toggleModal}>
        {type}
      </Typography>
      <SigModal open={modalOpen} onClose={toggleModal} wormhole={wormhole} />
    </>
  );
};

export default WhTypeLabel;
