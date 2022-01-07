import useSystemData from "../../SystemData/useSystemData";
import OverviewPanel from "../OverviewPanel";
import EffectInfoTable from "./EffectInfoTable";
import SystemActivityStats from "./SystemActivityStats";
import SystemInfoTitle from "./SystemInfoTitle";

export default () => {
  const { effect } = useSystemData();

  return (
    <OverviewPanel name="system-info" panelTitle={<SystemInfoTitle />} defaultExpanded>
      <SystemActivityStats />
      <EffectInfoTable effect={effect} />
    </OverviewPanel>
  );
};
