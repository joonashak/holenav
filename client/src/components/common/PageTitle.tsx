import { Typography, TypographyProps } from "@mui/material";

const PageTitle = ({ children, ...props }: TypographyProps) => (
  <Typography variant="h1" {...props}>
    {children}
  </Typography>
);

export default PageTitle;
