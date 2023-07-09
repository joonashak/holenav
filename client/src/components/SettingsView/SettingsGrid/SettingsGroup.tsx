import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";

type SettingsGroupProps = AccordionProps & {
  title: string;
};

const SettingsGroup = ({ title, children, ...accordionProps }: SettingsGroupProps) => (
  <Accordion {...accordionProps} sx={{ bgcolor: "primary.main" }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

export default SettingsGroup;
