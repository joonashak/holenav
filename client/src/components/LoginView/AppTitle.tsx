import { Theme, Typography } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "Gugi",
    fontSize: "5rem",
    color: theme.palette.secondary.light,
    "&:first-letter": {
      fontSize: "6.5rem",
    },
  },
}));

export default () => {
  const classes = useStyles();

  return <Typography className={classes.title}>Holenav</Typography>;
};
