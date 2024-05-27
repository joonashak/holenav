import QueueIcon from "@mui/icons-material/Queue";
import { Button } from "@mui/material";
import { useState } from "react";
import SigModal from "./sig-modal/SigModal";

const AddSigButton = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Button
        onClick={toggleOpen}
        variant="contained"
        data-cy="add-sig-button"
        fullWidth
        startIcon={<QueueIcon />}
        sx={{ mt: 2 }}
      >
        Add Signature
      </Button>
      <SigModal open={open} onClose={toggleOpen} />
    </>
  );
};

export default AddSigButton;
