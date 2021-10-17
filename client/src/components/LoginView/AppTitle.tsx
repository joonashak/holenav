import { Typography } from "@mui/material";

export default () => (
  <Typography
    sx={{
      fontFamily: "Gugi",
      fontSize: "5rem",
      color: "secondary.light",
      "&:first-letter": {
        fontSize: "6.5rem",
      },
    }}
  >
    Holenav
  </Typography>
);
