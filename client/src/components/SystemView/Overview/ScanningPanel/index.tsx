import { useEffect } from "react";
import OverviewPanel from "../OverviewPanel";
import AddSigButton from "./AddSigButton";
import ScanningTitle from "./ScanningTitle";
import SigList from "./SigList";
import useSigPasteListener from "./useSigPasteListener";

export default () => {
  const { sigPasteListener } = useSigPasteListener();

  useEffect(() => {
    window.addEventListener("paste", sigPasteListener);
    return () => window.removeEventListener("paste", sigPasteListener);
  }, []);

  return (
    <OverviewPanel name="scanning" title={<ScanningTitle />} defaultExpanded>
      <SigList />
      <AddSigButton />
    </OverviewPanel>
  );
};
