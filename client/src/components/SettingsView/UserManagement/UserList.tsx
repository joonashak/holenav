import { List, ListItem, Paper } from "@mui/material";
import useSettingsData from "../SettingsData/useSettingsData";

const UserList = () => {
  const { users } = useSettingsData();

  return (
    <Paper variant="outlined" sx={{ bgcolor: "primary.main" }}>
      <List disablePadding>
        {users.map((user) => (
          <ListItem
            key={user.main.esiId}
            sx={{
              "&:not(:last-child)": {
                borderBottom: "1px solid",
                borderBottomColor: "primary.dark",
              },
            }}
          >
            {user.main.name}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserList;
