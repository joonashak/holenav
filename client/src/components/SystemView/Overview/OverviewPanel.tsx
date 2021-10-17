import { Accordion, AccordionSummary, AccordionDetails, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    "&$expanded": { marginTop: 0, marginBottom: 0 },
  },
  summary: {
    color: theme.palette.secondary.light,
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
        expandIcon={<ExpandMoreIcon color="secondary" />}
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
