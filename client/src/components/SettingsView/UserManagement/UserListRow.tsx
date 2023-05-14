import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, IconButton, Paper, TableCell } from "@mui/material";
import { useState } from "react";
import { User } from "../../../generated/graphqlOperations";
import TableRow from "../../common/TableRow";

type UserListRowProps = {
  user: User;
};

const UserListRow = ({ user }: UserListRowProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((val) => !val);
  const { main } = user;

  return (
    <>
      <TableRow onClick={toggleOpen} sx={{ "&>td": { borderBottom: 0 } }}>
        <TableCell>
          <IconButton size="small" sx={{ color: "secondary.light" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{main.name}</TableCell>
        <TableCell>{main.alliance?.ticker}</TableCell>
        <TableCell>{main.corporation.ticker}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ mb: 2 }}>
            <Paper sx={{ p: 1 }}>Jee!</Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserListRow;
