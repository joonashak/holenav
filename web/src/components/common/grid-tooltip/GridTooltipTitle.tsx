import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";

export type GridTooltipTitleProps = {
  rows: Array<{ label: string; value: string }>;
};

const GridTooltipTitle = ({ rows }: GridTooltipTitleProps) => (
  <Grid container columnSpacing={1} sx={{ p: 1, minWidth: 200 }}>
    {rows.map((row) => (
      <Fragment key={`grid-tooltip-${row.label}-${row.value}`}>
        <Grid size={7}>
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            {row.label}
          </Typography>
        </Grid>
        <Grid size={5}>
          <Typography variant="body2">{row.value}</Typography>
        </Grid>
      </Fragment>
    ))}
  </Grid>
);

export default GridTooltipTitle;
