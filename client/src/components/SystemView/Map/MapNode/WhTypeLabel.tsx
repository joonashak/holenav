import { Typography } from "@mui/material";
import { useState } from "react";

type WhTypeLabelProps = {
  type: string | undefined;
  wormholeId: string | undefined;
};

// eslint-disable-next-line
const WhTypeLabel = ({ type, wormholeId }: WhTypeLabelProps) => {
  // eslint-disable-next-line
  const [modalOpen, setModalOpen] = useState(false);

  return <Typography variant="caption">{type}</Typography>;
};

export default WhTypeLabel;
