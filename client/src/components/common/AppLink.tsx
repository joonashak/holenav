import { Link } from "@mui/material";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

type AppLinkProps = {
  children: ReactElement | string;
  to: string;
};

const AppLink = ({ children, to }: AppLinkProps) => (
  <Link to={to} component={RouterLink}>
    {children}
  </Link>
);

export default AppLink;
