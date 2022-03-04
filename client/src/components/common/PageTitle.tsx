import { Typography, TypographyProps } from "@mui/material";

const PageTitle = ({ children, sx, ...props }: TypographyProps) => (
  <Typography variant="h1" sx={{ pb: 3, ...sx }} {...props}>
    {children}
  </Typography>
);

export default PageTitle;
