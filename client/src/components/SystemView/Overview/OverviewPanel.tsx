import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    "&$expanded": { marginTop: 0, marginBottom: 0 },
  },
  summary: {
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  summaryContent: {
    justifyContent: "space-between",
    alignItems: "center",
    "&$expanded": { marginTop: 0, marginBottom: 0 },
  },
  details: {
    flexDirection: "column",
  },
  expanded: {},
}));

type OverviewPanelProps = {
  title: ReactNode;
  children: ReactNode;
  name: string;
  defaultExpanded?: boolean;
};

const OverviewPanel = ({ title, children, name, defaultExpanded }: OverviewPanelProps) => {
  const classes = useStyles();

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      classes={{ expanded: classes.expanded }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name}-content`}
        id={`${name}-header`}
        className={classes.summary}
        classes={{ content: classes.summaryContent, expanded: classes.expanded }}
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
