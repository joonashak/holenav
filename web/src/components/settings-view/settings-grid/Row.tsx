import { Box, BoxProps } from "@mui/material";

type RowProps = BoxProps & {
  disableHover?: boolean;
  hideBorder?: boolean;
  padding?: number;
};

const Row = ({
  children,
  disableHover = false,
  hideBorder = false,
  padding = 2,
  ...boxProps
}: RowProps) => (
  <Box
    {...boxProps}
    sx={{
      display: "flex",
      pt: padding,
      pb: padding,
      borderBottom: hideBorder ? null : "1px solid",
      borderBottomColor: "primary.light",
      "&:hover": disableHover ? {} : { bgcolor: "rgba(0, 0, 0, 0.15)" },
      ...boxProps.sx,
    }}
  >
    {children}
  </Box>
);

export default Row;
