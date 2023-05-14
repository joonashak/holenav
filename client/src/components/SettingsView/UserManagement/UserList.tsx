import { Paper, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import useSettingsData from "../SettingsData/useSettingsData";
import TableRow from "../../common/TableRow";

const UserList = () => {
  const { users } = useSettingsData();

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "primary.main" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Alliance</TableCell>
            <TableCell>Corporation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={`user-list-row-${user.main.esiId}`}>
              <TableCell>{user.main.name}</TableCell>
              <TableCell>{user.main.alliance?.ticker}</TableCell>
              <TableCell>{user.main.corporation?.ticker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
