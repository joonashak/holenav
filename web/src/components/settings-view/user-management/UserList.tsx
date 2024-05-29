import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { clone } from "lodash";
import useLayout from "../../../utils/useLayout";
import TableRow from "../../common/TableRow";
import useSettingsData from "../useSettingsData";
import UserListRow from "./UserListRow";

const UserList = () => {
  const { users } = useSettingsData();
  const { wideViewport } = useLayout();

  const sortedUsers = clone(users).sort((a, b) =>
    a.main.name.localeCompare(b.main.name),
  );

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.main" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            {wideViewport && <TableCell>Alliance</TableCell>}
            {wideViewport && <TableCell>Corporation</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <UserListRow user={user} key={`user-list-row-${user.main.esiId}`} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
