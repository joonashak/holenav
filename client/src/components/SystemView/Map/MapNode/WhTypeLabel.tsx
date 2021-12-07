import { Typography } from "@mui/material";
import { useState } from "react";

type WhTypeLabelProps = {
  type: string | undefined;
};

const WhTypeLabel = ({ type }: WhTypeLabelProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return <Typography variant="caption">{type}</Typography>;
};

export default WhTypeLabel;
