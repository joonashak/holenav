import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="system-info-content"
      id="system-info-header"
    >
      <Typography>System: Class 5 - Pulsar</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Region, effects, activity stats, etc.</Typography>
    </AccordionDetails>
  </Accordion>
);
