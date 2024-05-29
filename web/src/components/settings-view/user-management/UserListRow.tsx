import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, IconButton, Paper, TableCell } from "@mui/material";
import { useState } from "react";
import { User } from "../../../generated/graphqlOperations";
import useLayout from "../../../utils/useLayout";
import TableRow from "../../common/TableRow";
import UserProfile from "./user-profile/UserProfile";

type UserListRowProps = {
  user: User;
};

const UserListRow = ({ user }: UserListRowProps) => {
  const { wideViewport } = useLayout();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((val) => !val);
  const { main } = user;

  return (
    <>
      <TableRow onClick={toggleOpen} sx={{ "&>td": { borderBottom: 0 } }}>
        <TableCell size="small">
          <IconButton size="small" sx={{ color: "secondary.light" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width="100%">{main.name}</TableCell>
        {wideViewport && <TableCell>{main.alliance?.ticker}</TableCell>}
        {wideViewport && <TableCell>{main.corporation.ticker}</TableCell>}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ mb: 2 }}>
            <Paper sx={{ p: 1 }}>
              <UserProfile user={user} />
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserListRow;
