import { Typography } from "@mui/material";
import SecurityClasses from "../../../../enum/SecurityClasses";
import useSystemData from "../../SystemData/useSystemData";

export default () => {
  const { securityClass, securityStatus, whClass, effect } = useSystemData();
  const roundedSecStatus = securityStatus.toFixed(1);

  const classTextMap = {
    [SecurityClasses.High]: `Highsec (${roundedSecStatus})`,
    [SecurityClasses.Low]: `Lowsec (${roundedSecStatus})`,
    [SecurityClasses.Null]: `Nullsec (${roundedSecStatus})`,
    [SecurityClasses.Wormhole]: `Class ${whClass}`,
  };

  const effectString = effect ? ` - ${effect.name}` : null;

  return (
    <Typography variant="h3">
      {classTextMap[securityClass]}
      {effectString}
    </Typography>
  );
};
