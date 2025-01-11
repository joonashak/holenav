import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI `<Link>` with React Router's `<Link>` as base component.
 *
 * Helps with imports as the two components are exported with the same name.
 */
const Link = (props: LinkProps<typeof RouterLink>) => (
  <MuiLink {...props} component={RouterLink} />
);

export default Link;
