import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import Map from "./Map";
import MapData from "./Map/MapData";
import Overview from "./Overview";
import QuickControl from "./QuickControl";
import SystemData from "./SystemData";
import useSystemData from "./SystemData/useSystemData";

const SystemView = () => {
  const { systemName } = useParams<{ systemName: string }>();
  const { changeSystem } = useSystemData();

  useEffect(() => {
    changeSystem({ variables: { name: systemName } });
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
