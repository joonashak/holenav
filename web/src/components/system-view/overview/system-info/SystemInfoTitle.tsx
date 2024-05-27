import { Tooltip, Typography } from "@mui/material";
import SecurityClasses from "../../../../enum/SecurityClasses";
import useSystemData from "../../system-data/useSystemData";
import EffectInfoTable, { EffectInfoTableProps } from "./EffectInfoTable";

const EffectLabel = ({ effect }: EffectInfoTableProps) => (
  <Tooltip
    title={<EffectInfoTable effect={effect} />}
    componentsProps={{
      tooltip: {
        sx: { padding: 0, margin: 1 },
      },
    }}
  >
    <span> - {effect && effect.name}</span>
  </Tooltip>
);

const SystemInfoTitle = () => {
  const { securityClass, securityStatus, whClass, effect } = useSystemData();
  const roundedSecStatus = securityStatus.toFixed(1);

  const classTextMap = {
    [SecurityClasses.High]: `Highsec (${roundedSecStatus})`,
    [SecurityClasses.Low]: `Lowsec (${roundedSecStatus})`,
    [SecurityClasses.Null]: `Nullsec (${roundedSecStatus})`,
    [SecurityClasses.Wormhole]: `Class ${whClass}`,
  };

  return (
    <Typography variant="h3">
      {classTextMap[securityClass]}
      {effect && <EffectLabel effect={effect} />}
    </Typography>
  );
};

export default SystemInfoTitle;
