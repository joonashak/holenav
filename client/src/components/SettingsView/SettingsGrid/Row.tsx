import { Box, BoxProps } from "@mui/material";

const Row = ({ children, ...boxProps }: BoxProps) => (
  <Box
    {...boxProps}
    sx={{
      display: "flex",
      borderBottom: "1px solid",
      borderBottomColor: "primary.light",
      "&:hover": { bgcolor: "rgba(0, 0, 0, 0.15)" },
      ...boxProps.sx,
    }}
  >
    {children}
  </Box>
);

export default Row;
