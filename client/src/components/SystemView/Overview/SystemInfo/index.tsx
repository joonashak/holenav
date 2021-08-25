import { Typography, Accordion, AccordionDetails } from "@material-ui/core";
import SystemInfoSummary from "./SystemInfoSummary";

export default () => (
  <Accordion>
    <SystemInfoSummary />
    <AccordionDetails>
      <Typography>Region, effects, activity stats, etc.</Typography>
    </AccordionDetails>
  </Accordion>
);
