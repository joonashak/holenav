import { Typography, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="system-info-content"
      id="system-info-header"
    >
      <Typography>{classTextMap[securityClass]} - [add effect]</Typography>
    </AccordionSummary>
  );
};
