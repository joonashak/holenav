import { Link, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type AppLinkProps = {
  children?: ReactNode | string;
  to: string;
};

const AppLink = ({ children, to }: AppLinkProps) => (
  <Link to={to} component={RouterLink}>
    <Typography sx={{ color: "white" }}>{children}</Typography>
  </Link>
);

AppLink.defaultProps = {
  children: null,
};

export default AppLink;
