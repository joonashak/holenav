import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";

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

  return (
    <FormControl className={classes.formControl} disabled>
      <InputLabel id="mock-user-select-label" className={classes.label}>
        Mock User
      </InputLabel>
      <Select
        variant="outlined"
        defaultValue="user1"
        label="Mock User"
        labelId="mock-user-select-label"
        id="mock-user-select"
        className={classes.select}
      >
        <MenuItem value="user1">User 1</MenuItem>
        <MenuItem value="user2">User 2</MenuItem>
      </Select>
    </FormControl>
  );
};
