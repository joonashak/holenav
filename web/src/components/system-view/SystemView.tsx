import { useEffect } from "react";
import Container from "./Container";
import Map from "./map/Map";
import MapData from "./map/map-data/MapData";
import Overview from "./overview/Overview";
import QuickControl from "./quick-control/QuickControl";
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
      <MapData>
        <Container>
          <Overview />
          <Map />
          <QuickControl />
        </Container>
      </MapData>
    </SystemData>
  );
};

export default SystemView;
