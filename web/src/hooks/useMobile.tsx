import { useMediaQuery, useTheme } from "@mui/material";

const useMobile = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return mobile;
};

export default useMobile;
