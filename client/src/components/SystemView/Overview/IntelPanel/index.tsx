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
      aria-controls="intel-content"
      id="intel-header"
    >
      <Typography>Intel: 2 structures</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Structures, notes, etc.</Typography>
    </AccordionDetails>
  </Accordion>
);
