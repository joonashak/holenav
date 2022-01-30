import { useEffect } from "react";
import Container from "./Container";
import Map from "./Map";
import MapData from "./Map/MapData";
import Overview from "./Overview";
import QuickControl from "./QuickControl";
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
    console.log("Mounting SystemView");
    return () => console.log("Unmounting SystemView");
  }, []);

  useEffect(() => {
    // FIXME: Overview does not update correctly. No more unnecessary re-mounting, though.
    changeSystem({ variables: { name: systemName } });
    console.log("Running changeSystem() in SystemView", systemName);
  }, [systemName]);

  return (
    <MapData>
      <Container>
        <Overview />
        <Map />
        <QuickControl />
      </Container>
    </MapData>
  );
};
