import { Box, BoxProps } from "@mui/material";

const SplitRow = ({ children, ...boxProps }: BoxProps) => (
  <Box
    {...boxProps}
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      "&>*": { mr: { md: 4 } },
      "&>*:last-child": { mr: 0 },
    }}
  >
    {children}
  </Box>
);

export default SplitRow;
