import OverviewPanel from "../OverviewPanel";
import AddSigButton from "./AddSigButton";
import ScanningTitle from "./ScanningTitle";
import SigList from "./SigList";

export default () => (
  <OverviewPanel name="scanning" title={<ScanningTitle />} expanded>
    <SigList />
    <AddSigButton />
  </OverviewPanel>
);
