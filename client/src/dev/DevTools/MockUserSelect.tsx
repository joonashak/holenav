import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import mockUserStore from "../mockUserStore";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    width: "15rem",
    marginLeft: "2rem",
  },
  label: {
    position: "absolute",
    top: -6,
    left: 14,
    color: theme.palette.primary.main,
  },
  select: {
    color: theme.palette.primary.main,
  },
}));

export default () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState("none");
  const disabled = !users.length;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_CMS_URL}/dev/mockUsers`);
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
    <FormControl className={classes.formControl} disabled={disabled}>
      <InputLabel id="mock-user-select-label" className={classes.label}>
        Mock User
      </InputLabel>
      <Select
        variant="outlined"
        value={activeUser}
        label="Mock User"
        labelId="mock-user-select-label"
        id="mock-user-select"
        className={classes.select}
        onChange={onChange}
      >
        <MenuItem value="none">None</MenuItem>
        {users.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
