import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SigList from "./SigList";

export default () => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="scanning-content"
      id="scanning-header"
    >
      <Typography>Scanning: 5 sigs (10 anoms)</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <SigList />
    </AccordionDetails>
  </Accordion>
);
