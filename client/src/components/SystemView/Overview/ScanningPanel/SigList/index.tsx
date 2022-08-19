import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell as MuiTableCell,
  Paper,
  TableCellProps,
} from "@mui/material";
import { SigType } from "../../../../../generated/graphqlOperations";
import TableRow from "../../../../common/TableRow";
import useSignatures from "../../../SystemData/useSignatures";
import DeleteSigButton from "./DeleteSigButton";
import EditSigButton from "./EditSigButton";
import SigContextMenu from "./SigContextMenu";

const TableHeadCell = ({ children }: TableCellProps) => (
  <MuiTableCell sx={{ color: "secondary.light", fontSize: "0.95rem" }}>{children}</MuiTableCell>
);

const TableCell = ({ children, sx }: TableCellProps) => (
  <MuiTableCell sx={{ borderBottomColor: "primary.main", ...sx }}>{children}</MuiTableCell>
);

export default () => {
  const { signatures } = useSignatures();

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.light" }}>
      <Table aria-label="Signature List" size="small">
        <TableHead sx={{ bgcolor: "primary.dark" }}>
          <TableRow hideLastSeparator>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody data-cy="sig-list-body">
          {signatures &&
            signatures.map((sig) => (
              <SigContextMenu key={sig.id} signature={sig}>
                <TableCell component="th" scope="row">
                  {sig.eveId}
                </TableCell>
                <TableCell>{sig.type || (sig.type === SigType.Wormhole && "Wormhole")}</TableCell>
                <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {sig.name}
                    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                      <EditSigButton signature={sig} />
                      <DeleteSigButton sig={sig} />
                    </Box>
                  </Box>
                </TableCell>
              </SigContextMenu>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
