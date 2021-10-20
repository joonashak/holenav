import { Button } from "@mui/material";
import { useState } from "react";
import SigModal from "./SigModal";

export default () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Button
        onClick={toggleOpen}
        variant="contained"
        data-cy="add-sig-button"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Signature
      </Button>
      <SigModal open={open} onClose={toggleOpen} />
    </>
  );
};
