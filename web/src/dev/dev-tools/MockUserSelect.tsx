import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import useLocalData from "../../components/local-data/useLocalData";
import devToolsService from "../../services/devToolsService";

const MockUserSelect = () => {
  const [users, setUsers] = useState([]);
  const nullString = "none";
  const { mockUser, setMockUser } = useLocalData();

  useEffect(() => {
    (async () => {
      const { data } = await devToolsService.getMockUsers();
      setUsers(data);
    })();
  }, []);

  const onChange = async (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    await setMockUser(value === nullString ? null : value);
    window.location.reload();
  };

  return (
    <FormControl>
      <InputLabel
        id="mock-user-select-label"
        sx={{ color: "primary.dark", "&:selected": { color: "red" } }}
      >
        Mock User
      </InputLabel>
      <Select
        value={mockUser || nullString}
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
        <MenuItem value={nullString}>None</MenuItem>
        {users.map(({ id, name }) => (
          <MenuItem value={id} key={id} data-cy={`mock-user-option-${id}`}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MockUserSelect;
