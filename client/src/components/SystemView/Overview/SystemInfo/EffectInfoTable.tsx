import { WormholeEffect } from "@eve-data/systems/lib/src/api/system.type";
import { Paper, Table, TableBody, TableCell, TableContainer } from "@mui/material";
import TableRow from "../../../common/TableRow";

export type EffectInfoTableProps = {
  effect: WormholeEffect | null;
};

const EffectInfoTable = ({ effect }: EffectInfoTableProps) => {
  if (!effect) {
    return null;
  }

  const cellSx = (isPositive: boolean) => ({
    borderBottomColor: "primary.main",
    color: isPositive ? "secondary.light" : "error.light",
  });

  const strengthString = (strength: number) =>
    `${strength > 0 ? "+" : "–"} ${Math.abs(strength)} %`;

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.dark" }}>
      <Table aria-label="Wormhole Effect Information" size="small">
        <TableBody>
          {effect.traits.map((trait) => (
            <TableRow key={`${effect.id}-${trait.description.short}`} hideLastSeparator>
              <TableCell sx={cellSx(trait.isPositive)}>{trait.description.short}</TableCell>
              <TableCell sx={{ ...cellSx(trait.isPositive), textAlign: "right" }}>
                {strengthString(trait.strength)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EffectInfoTable;
