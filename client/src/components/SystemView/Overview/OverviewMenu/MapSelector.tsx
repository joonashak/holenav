import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import useUserData from "../../../UserData/useUserData";

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
  const {
    settings: { maps },
  } = useUserData();

  return (
    <FormControl fullWidth>
      <InputLabel id="map-selector-label" classes={labelClasses}>
        Map
      </InputLabel>
      <Select defaultValue={maps[0].id} label="Moi" labelId="map-selector-label">
        {maps.map(({ id, name }) => (
          <MenuItem key={`map-selector-option-${id}`} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
