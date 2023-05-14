import { Paper, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import useSettingsData from "../SettingsData/useSettingsData";
import TableRow from "../../common/TableRow";
import UserListRow from "./UserListRow";

const UserList = () => {
  const { users } = useSettingsData();

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.main" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Alliance</TableCell>
            <TableCell>Corporation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserListRow user={user} key={`user-list-row-${user.main.esiId}`} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
