import Box from "@mui/material/Box";
import { useEffect } from "react";
import OverviewPanel from "../OverviewPanel";
import AddSigButton from "./AddSigButton";
import PasteSigsButton from "./PasteSigsButton";
import ScanningTitle from "./ScanningTitle";
import SigList from "./sig-list/SigList";
import useSigPasteListener from "./sig-paste-listener/useSigPasteListener";

const ScanningPanel = () => {
  const { sigPasteListener } = useSigPasteListener();

  useEffect(() => {
    window.addEventListener("paste", sigPasteListener);
    return () => window.removeEventListener("paste", sigPasteListener);
  }, []);

  return (
    <OverviewPanel
      name="scanning"
      panelTitle={<ScanningTitle />}
      defaultExpanded
    >
      <SigList />
      <AddSigButton />
      <Box sx={{ display: "flex" }}>
        <PasteSigsButton sx={{ mr: 1 }} />
        <PasteSigsButton sync sx={{ ml: 1 }} />
      </Box>
    </OverviewPanel>
  );
};

export default ScanningPanel;
