import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Paper,
  TableCellProps,
  TableRowProps,
} from "@mui/material";
import SigTypes from "../../../../../enum/SigTypes";
import useSystemData from "../../../SystemData/useSystemData";
import EditSigButton from "./EditSigButton";

const TableRow = ({ children }: TableRowProps) => (
  <MuiTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>{children}</MuiTableRow>
);

const TableHeadCell = ({ children }: TableCellProps) => (
  <MuiTableCell sx={{ color: "secondary.light", fontSize: "0.95rem" }}>{children}</MuiTableCell>
);

const TableCell = ({ children }: TableCellProps) => (
  <MuiTableCell sx={{ borderBottomColor: "primary.main" }}>{children}</MuiTableCell>
);

export default () => {
  const { signatures, wormholes } = useSystemData();
  const allSigs = signatures.concat(
    wormholes.map((wh) => ({ ...wh, type: wh.type || SigTypes.WORMHOLE }))
  );

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.light" }}>
      <Table aria-label="simple table" size="small">
        <TableHead sx={{ bgcolor: "primary.dark" }}>
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
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {sig.name}
                    <EditSigButton sig={sig} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
