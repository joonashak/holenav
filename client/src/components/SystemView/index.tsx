import Overview from "./Overview";
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
      <Overview />
    </SystemData>
  );
};
