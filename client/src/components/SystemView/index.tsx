import { useEffect } from "react";
import Container from "./Container";
import Map from "./Map";
import MapData from "./Map/MapData";
import Overview from "./Overview";
import QuickControl from "./QuickControl";
import SystemData from "./SystemData";
import useSystemData from "./SystemData/useSystemData";

interface SystemViewProps {
  match: {
    params: {
      systemName: string;
    };
  };
}

export default ({ match }: SystemViewProps) => {
  const { systemName } = match.params;
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
