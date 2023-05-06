import { useState } from "react";
import DevToolsDrawer from "./DevToolsDrawer";
import DevToolsFab from "./DevToolsFab";

const DevTools = () => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <DevToolsFab onClick={toggleOpen} />
      <DevToolsDrawer open={open} onClose={toggleOpen} />
    </>
  );
};

export default DevTools;
