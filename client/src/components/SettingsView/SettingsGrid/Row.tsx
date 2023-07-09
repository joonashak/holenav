import { Box, BoxProps } from "@mui/material";

type RowProps = BoxProps & {
  disableHover?: boolean;
};

const Row = ({ children, disableHover = false, ...boxProps }: RowProps) => (
  <Box
    {...boxProps}
    sx={{
      display: "flex",
      pt: 2,
      pb: 2,
      borderBottom: "1px solid",
      borderBottomColor: "primary.light",
      "&:hover": disableHover ? {} : { bgcolor: "rgba(0, 0, 0, 0.15)" },
      ...boxProps.sx,
    }}
  >
    {children}
  </Box>
);

export default Row;
