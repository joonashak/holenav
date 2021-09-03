import { useState } from "react";
import DevToolsDrawer from "./DevToolsDrawer";
import DevToolsFab from "./DevToolsFab";

export default () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <DevToolsFab onClick={toggleOpen} />
      <DevToolsDrawer open={open} onClose={toggleOpen} />
    </>
  );
};
