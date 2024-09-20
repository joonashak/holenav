import { Typography } from "@mui/material";
import useSystemData from "../system-data/useSystemData";

const OverviewTitle = () => {
  const { name } = useSystemData();

  return <Typography variant="h6">{name}</Typography>;
};

export default OverviewTitle;
