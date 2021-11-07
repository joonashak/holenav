import Container from "./Container";
import Map from "./Map";
import MapData from "./Map/MapData";
import Overview from "./Overview";
import QuickControl from "./QuickControl";
import SystemData from "./SystemData";

interface SystemViewProps {
  match: {
    params: {
      systemName: string;
    };
  };
}

export default ({ match }: SystemViewProps) => {
  const { systemName } = match.params;

  return (
    <SystemData name={systemName}>
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
