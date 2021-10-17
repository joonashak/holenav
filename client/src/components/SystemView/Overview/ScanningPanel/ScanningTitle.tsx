import { Chip, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useSystemData from "../../SystemData/useSystemData";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: "1.05rem",
  },
}));

export default () => {
  const { signatures } = useSystemData();
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3">Signatures</Typography>
      {signatures && <Chip label={signatures.length} className={classes.chip} />}
    </>
  );
};
