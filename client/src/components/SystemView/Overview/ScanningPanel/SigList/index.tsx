import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  Paper,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import useSystemData from "../../../SystemData/useSystemData";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const TableHeadCell = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    fontSize: "0.95rem",
    fontWeight: 500,
    borderBottomColor: theme.palette.primary.dark,
  },
}))(MuiTableCell);

const TableCell = withStyles((theme: Theme) => ({
  root: { borderBottomColor: theme.palette.primary.main },
}))(MuiTableCell);

export default () => {
  const classes = useStyles();

  const { signatures, wormholes } = useSystemData();
  const allSigs = signatures.concat(wormholes);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSigs &&
            allSigs.map((sig) => (
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
