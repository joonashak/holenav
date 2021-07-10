import {
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      width: "30rem",
    },
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">J123456 - K5A ABC</Typography>
        </Toolbar>
      </AppBar>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="system-info-content"
          id="system-info-header"
        >
          <Typography>System: Class 5 - Pulsar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Region, effects, activity stats, etc.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="scanning-content"
          id="scanning-header"
        >
          <Typography>Scanning: 5 sigs (10 anoms)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Sigs and anoms editable list</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="intel-content"
          id="intel-header"
        >
          <Typography>Intel: 2 structures</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Structures, notes, etc.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
