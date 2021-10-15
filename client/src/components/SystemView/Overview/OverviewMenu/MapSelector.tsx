import { FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import { ChangeEvent } from "react";
import useUserData from "../../../UserData/useUserData";
import useMapData from "../../Map/MapData/useMapData";

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
  const { setSelectedMap } = useMapData();
  const {
    settings: { maps },
  } = useUserData();

  const onChange = ({ target }: ChangeEvent<{ value: unknown }>) => {
    setSelectedMap(target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="map-selector-label" classes={labelClasses}>
        Map
      </InputLabel>
      <Select
        defaultValue={maps[0].id}
        label="Moi"
        labelId="map-selector-label"
        onChange={onChange}
      >
        {maps.map(({ id, name }) => (
          <MenuItem key={`map-selector-option-${id}`} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
