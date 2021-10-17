import { Typography } from "@mui/material";
import SecurityClasses from "../../../../enum/SecurityClasses";
import useSystemData from "../../SystemData/useSystemData";

export default () => {
  const { securityClass, securityStatus, whClass } = useSystemData();
  const roundedSecStatus = securityStatus.toFixed(1);

  const classTextMap = {
    [SecurityClasses.High]: `Highsec (${roundedSecStatus})`,
    [SecurityClasses.Low]: `Lowsec (${roundedSecStatus})`,
    [SecurityClasses.Null]: `Nullsec (${roundedSecStatus})`,
    [SecurityClasses.Wormhole]: `Class ${whClass}`,
  };

  return <Typography variant="h3">{classTextMap[securityClass]} - [add effect]</Typography>;
};
