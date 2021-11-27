import { FormControlLabel, Switch, Typography } from "@mui/material";
import useLocalData from "../../components/LocalData/useLocalData";

const PollSettingSwitch = () => {
  const { pollSetting, setPollSetting } = useLocalData();

  const onChange = () => {
    setPollSetting(!pollSetting);
  };

  return (
    <FormControlLabel
      label={
        <Typography variant="button" sx={{ fontSize: 16 }}>
          Polling
        </Typography>
      }
      control={<Switch />}
      sx={{ color: "primary.dark" }}
      onChange={onChange}
      checked={pollSetting}
    />
  );
};

export default PollSettingSwitch;
