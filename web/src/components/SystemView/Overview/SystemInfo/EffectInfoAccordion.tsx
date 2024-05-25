import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSystemData from "../../SystemData/useSystemData";
import EffectInfoTable from "./EffectInfoTable";

const ExpandIcon = ({ effect }: { effect: boolean }) =>
  effect ? <ExpandMoreIcon sx={{ color: "primary.light", m: 0 }} /> : null;

const EffectInfoAccordion = () => {
  const { effect } = useSystemData();

  return (
    <Accordion sx={{ width: 0.8, mx: "auto" }} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandIcon effect={!!effect} />}
        disabled={!effect}
        aria-controls="system-effects-accordion"
        id="system-effects-header"
        sx={{
          minHeight: 0,
          "&>div:first-of-type": {
            m: 1,
            justifyContent: "center",
            flexGrow: 0,
          },
        }}
      >
        <Typography sx={{ textTransform: "uppercase" }} variant="button">
          {effect ? "Effect Details" : "No System Effect"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <EffectInfoTable effect={effect} />
      </AccordionDetails>
    </Accordion>
  );
};

export default EffectInfoAccordion;
