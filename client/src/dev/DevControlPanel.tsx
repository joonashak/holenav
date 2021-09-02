import { Fab } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import { useState } from "react";

export default () => {
  const [open, setOpen] = useState();

  return (
    <>
      <Fab color="secondary">
        <BuildIcon />
      </Fab>
    </>
  );
};
