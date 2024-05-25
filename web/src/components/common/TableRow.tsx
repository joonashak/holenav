import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from "@mui/material";

type TableRowProps = MuiTableRowProps & {
  hideLastSeparator?: boolean;
};

/** MUI `TableRow` with option to hide last row's separator (bottom border). */
const TableRow = ({
  children,
  sx: sxInput,
  hideLastSeparator,
  ...rest
}: TableRowProps) => {
  const sx = hideLastSeparator
    ? { ...sxInput, "&:last-child td, &:last-child th": { border: 0 } }
    : sxInput;

  return (
    <MuiTableRow {...rest} sx={sx}>
      {children}
    </MuiTableRow>
  );
};

TableRow.defaultProps = {
  hideLastSeparator: false,
};

export default TableRow;
