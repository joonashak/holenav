import { Box, Tooltip, tooltipClasses, useTheme } from "@mui/material";
import { ReactElement } from "react";
import GridTooltipTitle, { GridTooltipTitleProps } from "./GridTooltipTitle";

type GridTooltipProps = {
  children: ReactElement;
  rows: GridTooltipTitleProps["rows"];
};
const GridTooltip = ({ children, rows }: GridTooltipProps) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={<GridTooltipTitle rows={rows} />}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.dark,
            [`& .${tooltipClasses.arrow}`]: {
              color: theme.palette.primary.dark,
            },
          },
        },
      }}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};

export default GridTooltip;
