import { Typography, TypographyProps } from "@mui/material";

export default ({ sx, ...props }: TypographyProps) => (
  <Typography
    sx={{
      fontFamily: "Gugi",
      fontSize: "5rem",
      color: "secondary.light",
      "&:first-letter": {
        fontSize: "6.5rem",
      },
      ...sx,
    }}
    {...props}
  >
    Holenav
  </Typography>
);
