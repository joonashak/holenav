/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from "@mui/material";
import { useState } from "react";
import { Wormhole } from "../MapData/types";

type WhTypeLabelProps = {
  type: string | undefined;
  signature: Wormhole | undefined;
};

const WhTypeLabel = ({ type, signature }: WhTypeLabelProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <Typography variant="caption" onClick={toggleModal}>
        {type}
      </Typography>
      {/*
      <SigModal open={modalOpen} onClose={toggleModal} signature={signature} />
      */}
    </>
  );
};

export default WhTypeLabel;
