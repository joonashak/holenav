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
import { Signature, Wormhole } from "../../../SystemData/types";
import useSystemData from "../../../SystemData/useSystemData";
import DeleteSigButton from "./DeleteSigButton";
import EditSigButton from "./EditSigButton";

const TableRow = ({ children }: TableRowProps) => (
  <MuiTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>{children}</MuiTableRow>
);

const TableHeadCell = ({ children }: TableCellProps) => (
  <MuiTableCell sx={{ color: "secondary.light", fontSize: "0.95rem" }}>{children}</MuiTableCell>
);

const TableCell = ({ children, sx }: TableCellProps) => (
  <MuiTableCell sx={{ borderBottomColor: "primary.main", ...sx }}>{children}</MuiTableCell>
);

export default () => {
  const { signatures, wormholes } = useSystemData();
  const allSigs = signatures.concat(wormholes);

  const isWormhole = (sig: Signature | Wormhole): boolean => Object.keys(sig).includes("eol");

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
        <TableBody data-cy="sig-list-body">
          {allSigs &&
            allSigs.map((sig) => (
              <TableRow key={sig.id}>
                <TableCell component="th" scope="row">
                  {sig.eveId}
                </TableCell>
                <TableCell>{sig.type || (isWormhole(sig) && "Wormhole")}</TableCell>
                <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    {sig.name}
                    <Box>
                      <EditSigButton sig={sig} />
                      <DeleteSigButton sig={sig} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
