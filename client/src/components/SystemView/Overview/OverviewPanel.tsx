import { Accordion, AccordionSummary, AccordionDetails, AccordionProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

type OverviewPanelProps = AccordionProps & {
  panelTitle: ReactNode;
  name: string;
};

const OverviewPanel = ({ panelTitle, children, name, defaultExpanded, sx }: OverviewPanelProps) => (
  <Accordion
    defaultExpanded={defaultExpanded}
    disableGutters
    square
    sx={{
      backgroundColor: "primary.main",
      color: "text.primary",
      ...sx,
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
      {panelTitle}
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

export default OverviewPanel;
