import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

type OverviewPanelProps = {
  title: ReactNode;
  children: ReactNode;
  name: string;
  defaultExpanded?: boolean;
};

const OverviewPanel = ({ title, children, name, defaultExpanded }: OverviewPanelProps) => (
  <Accordion
    defaultExpanded={defaultExpanded}
    disableGutters
    sx={{
      backgroundColor: "primary.main",
      color: "text.primary",
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon color="secondary" />}
      aria-controls={`${name}-content`}
      id={`${name}-header`}
      sx={{
        color: "secondary.light",
        minHeight: 56,
      }}
    >
      {title}
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

OverviewPanel.defaultProps = {
  defaultExpanded: false,
};

export default OverviewPanel;
