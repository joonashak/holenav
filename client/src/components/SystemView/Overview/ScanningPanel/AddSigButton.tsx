import { Button } from "@mui/material";
import { useState } from "react";
import SigModal from "./SigModal";

export default () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained" data-cy="add-sig-button">
        Add Signature
      </Button>
      <SigModal open={open} onClose={toggleOpen} />
    </>
  );
};
