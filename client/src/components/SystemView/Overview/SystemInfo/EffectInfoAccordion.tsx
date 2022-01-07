import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";
import EffectInfoTable from "./EffectInfoTable";

const EffectInfoAccordion = () => {
  const { effect } = useSystemData();

  return (
    <Accordion disableGutters defaultExpanded>
      <AccordionSummary sx={{ minHeight: 0, "&>*": { m: 1, justifyContent: "center" } }}>
        <Typography sx={{ textTransform: "uppercase" }} variant="button">
          System Effect
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <EffectInfoTable effect={effect} />
      </AccordionDetails>
    </Accordion>
  );
};

export default EffectInfoAccordion;
