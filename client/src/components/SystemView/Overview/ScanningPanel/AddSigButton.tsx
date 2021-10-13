import { Button } from "@material-ui/core";
import { useState } from "react";
import SigModal from "./SigModal";

export default () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Button onClick={toggleOpen} data-cy="add-sig-button">
        Add Signature
      </Button>
      <SigModal open={open} onClose={toggleOpen} />
    </>
  );
};
