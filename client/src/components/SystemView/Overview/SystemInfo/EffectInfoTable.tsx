import { WormholeEffect } from "@eve-data/systems/lib/src/api/system.type";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

type EffectInfoTableProps = {
  effect: WormholeEffect | null;
};

const EffectInfoTable = ({ effect }: EffectInfoTableProps) => {
  if (!effect) {
    return null;
  }

  return (
    <TableContainer>
      <Table aria-label="Wormhole Effect Information" size="small">
        <TableBody>
          {effect.traits.map((trait) => (
            <TableRow key={`${effect.id}-${trait.description.short}`}>
              <TableCell>{trait.description.short}</TableCell>
              <TableCell>{trait.strength}&nbsp;%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EffectInfoTable;
