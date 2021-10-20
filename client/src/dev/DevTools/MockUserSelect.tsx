import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../config";
import mockUserStore from "../mockUserStore";

export default () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState("none");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(endpoints.dev.mockUsers);
      const storedUser = await mockUserStore.getMockUser();
      setActiveUser(storedUser || "none");
      setUsers(data);
    })();
  }, []);

  const onChange = async (event: any) => {
    const { value } = event.target;
    setActiveUser(value);
    await mockUserStore.setMockUser(value);
    window.location.reload();
  };

  return (
    <FormControl>
      <InputLabel id="mock-user-select-label">Mock User</InputLabel>
      <Select
        value={activeUser}
        label="Mock User"
        labelId="mock-user-select-label"
        id="mock-user-select"
        onChange={onChange}
        data-cy="mock-user-select"
        sx={{
          color: "primary.dark",
          "& .MuiSelect-icon": { color: "primary.main" },
        }}
      >
        <MenuItem value="none">None</MenuItem>
        {users.map(({ id, name }) => (
          <MenuItem value={id} key={id} data-cy={`mock-user-option-${id}`}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
