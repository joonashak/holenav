import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  Theme,
} from "@material-ui/core";
import useSystemData from "../../../SystemData/useSystemData";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default () => {
  const { signatures } = useSystemData();
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signatures &&
            signatures.map((sig) => (
              <TableRow key={sig.id}>
                <TableCell component="th" scope="row">
                  {sig.eveId}
                </TableCell>
                <TableCell>{sig.type}</TableCell>
                <TableCell>{sig.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
