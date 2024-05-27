import { BoxProps } from "@mui/material";
import Row from "./Row";

const SplitRow = ({ children, ...boxProps }: BoxProps) => (
  <Row
    {...boxProps}
    padding={0}
    disableHover
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      "&>*": {
        mr: { md: 2 },
        pr: { md: 2 },
        borderRight: { md: "1px solid" },
        borderRightColor: { md: "primary.light" },
      },
      "&>*:last-child": { mr: 0, pr: 0, border: 0 },
    }}
  >
    {children}
  </Row>
);

export default SplitRow;
