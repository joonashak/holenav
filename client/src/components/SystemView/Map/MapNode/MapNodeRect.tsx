import { Theme, styled } from "@mui/material";

const getSecurityStyle = (securityClass: string, theme: Theme) => {
  if (securityClass === "NULL") {
    return theme.palette.error.light;
  }
  if (securityClass === "LOW") {
    return theme.palette.warning.light;
  }
  if (securityClass === "HIGH") {
    return theme.palette.secondary.light;
  }
  return theme.palette.primary.light;
};

const Rect = (props: any) => <rect {...props} />;
const MapNodeRect = styled(Rect)(({ theme, securityclass }) => ({
  "&&": {
    stroke: getSecurityStyle(securityclass, theme),
    strokeWidth: securityclass === "WH" ? 1 : 3,
    fill: theme.palette.primary.main,
  },
}));

export default MapNodeRect;
