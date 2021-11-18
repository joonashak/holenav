import { SelectChangeEvent } from "@mui/material";
import Select from "../../../controls/Select";
import useUserData from "../../../UserData/useUserData";

export default () => {
  const {
    setSelectedMap,
    settings: { maps, selectedMap },
  } = useUserData();

  const onChange = ({ target }: SelectChangeEvent) => {
    setSelectedMap(target.value as string);
  };

  const options = maps.map(({ id, name }) => ({ id, value: id, label: name }));
  const value = selectedMap?.id || "";

  return <Select title="Map" onChange={onChange} value={value} options={options} />;
};
