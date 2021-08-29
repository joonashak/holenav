import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddSigButton from "./AddSigButton";
import SigList from "./SigList";

const useStyles = makeStyles({
  details: {
    flexDirection: "column",
  },
});

export default () => {
  const classes = useStyles();

  return (
    <Accordion expanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="scanning-content"
        id="scanning-header"
      >
        <Typography>Scanning: 5 sigs (10 anoms)</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <SigList />
        <AddSigButton />
      </AccordionDetails>
    </Accordion>
  );
};
