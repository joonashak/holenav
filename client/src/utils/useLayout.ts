import { useMediaQuery, useTheme } from "@mui/material";

const useLayout = () => {
  const theme = useTheme();
  const wideViewport = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });

  return {
    wideViewport,
    narrowViewport: !wideViewport,
  };
};

export default useLayout;
