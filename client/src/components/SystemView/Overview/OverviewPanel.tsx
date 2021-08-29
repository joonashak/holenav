import { Accordion, AccordionSummary, AccordionDetails, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactNode } from "react";

const useStyles = makeStyles({
  details: {
    flexDirection: "column",
  },
});

type OverviewPanelProps = {
  title: ReactNode;
  children: ReactNode;
  name: string;
  expanded?: boolean;
};

const OverviewPanel = ({ title, children, name, expanded }: OverviewPanelProps) => {
  const classes = useStyles();

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name}-content`}
        id={`${name}-header`}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className={classes.details}>{children}</AccordionDetails>
    </Accordion>
  );
};

OverviewPanel.defaultProps = {
  expanded: false,
};

export default OverviewPanel;
