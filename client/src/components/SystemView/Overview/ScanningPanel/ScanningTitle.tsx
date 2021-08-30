import { Chip, makeStyles, Theme, Typography } from "@material-ui/core";
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
