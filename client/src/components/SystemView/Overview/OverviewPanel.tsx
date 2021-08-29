import { Accordion, AccordionSummary, AccordionDetails, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactNode } from "react";

const useStyles = makeStyles({
  details: {
    flexDirection: "column",
  },
  expanded: {
    "&$expanded": { margin: 0 },
  },
});

type OverviewPanelProps = {
  title: ReactNode;
  children: ReactNode;
  name: string;
  defaultExpanded?: boolean;
};

const OverviewPanel = ({ title, children, name, defaultExpanded }: OverviewPanelProps) => {
  const classes = useStyles();

  return (
    <Accordion defaultExpanded={defaultExpanded} classes={{ expanded: classes.expanded }}>
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
  defaultExpanded: false,
};

export default OverviewPanel;
