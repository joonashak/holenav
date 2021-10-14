import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";

const dummy = ["Jita", "Amarr"].map((s) => ({ key: s, value: s, label: s }));

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.secondary.light,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
}));

export default () => {
  const labelClasses = useLabelStyles();

  return (
    <FormControl fullWidth>
      <InputLabel id="map-selector-label" classes={labelClasses}>
        Map
      </InputLabel>
      <Select defaultValue={dummy[0].value} label="Moi" labelId="map-selector-label">
        {dummy.map(({ key, value, label }) => (
          <MenuItem key={key} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
