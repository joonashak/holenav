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
import { sortBy } from "lodash";
import { SigType } from "../../../../../generated/graphqlOperations";
import TableRow from "../../../../common/TableRow";
import useSignatures from "../../../SystemData/useSignatures";
import DeleteSigButton from "./DeleteSigButton";
import EditSigButton from "./EditSigButton";
import LifetimeClock from "./LifetimeClock";
import SigContextMenu from "./SigContextMenu";
import SigTypeLabel from "./SigTypeLabel";

const TableHeadCell = ({ children, sx }: TableCellProps) => (
  <MuiTableCell sx={{ color: "secondary.light", fontSize: "0.95rem", ...sx }}>
    {children}
  </MuiTableCell>
);

const TableCell = ({ children, sx }: TableCellProps) => (
  <MuiTableCell sx={{ borderBottomColor: "primary.main", ...sx }}>{children}</MuiTableCell>
);

export default () => {
  const { signatures } = useSignatures();
  const sortedSigs = sortBy(signatures, ["eveId"]);

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.light" }}>
      <Table aria-label="Signature List" size="small">
        <TableHead sx={{ bgcolor: "primary.dark" }}>
          <TableRow hideLastSeparator>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell sx={{ p: 0 }} />
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody data-cy="sig-list-body">
          {signatures &&
            sortedSigs.map((sig) => (
              <SigContextMenu key={sig.id} signature={sig}>
                <TableCell component="th" scope="row" sx={{ whiteSpace: "nowrap", width: 0.2 }}>
                  {sig.eveId}
                </TableCell>
                <TableCell sx={{ textTransform: "capitalize", width: 0.2 }}>
                  <SigTypeLabel signature={sig} />
                </TableCell>
                <TableCell
                  sx={{ paddingTop: 0, paddingBottom: 0, maxWidth: 0, width: "100%", pr: 0 }}
                >
                  <Box
                    sx={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {sig.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 0 }}>
                  {sig.type === SigType.Wormhole && <LifetimeClock signature={sig} />}
                </TableCell>
                <TableCell sx={{ width: 0.2, pr: 1, pl: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <EditSigButton signature={sig} />
                    <DeleteSigButton sig={sig} />
                  </Box>
                </TableCell>
              </SigContextMenu>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
