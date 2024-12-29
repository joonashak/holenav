import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Map from "../map/Map";
import Container from "./Container";
import FloatingMapperControls from "./floating-mapper-controls/FloatingMapperControls";
import Overview from "./overview/Overview";
import SystemData from "./system-data/SystemData";
import useSystemData from "./system-data/useSystemData";
import useCurrentSystemName from "./useCurrentSystemName";

const SystemView = () => {
  const systemName = useCurrentSystemName();
  const { changeSystem } = useSystemData();

  useEffect(() => {
    changeSystem(systemName);
  }, [systemName]);

  return (
    <SystemData>
      <Container>
        <Overview />
        <Map />
        <FloatingMapperControls />
        <Outlet />
      </Container>
    </SystemData>
  );
};

export default SystemView;
