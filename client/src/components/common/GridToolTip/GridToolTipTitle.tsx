import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";

export type GridTooltipTitleProps = {
  rows: Array<{ label: string; value: string }>;
};

const GridTooltipTitle = ({ rows }: GridTooltipTitleProps) => (
  <Grid container columnSpacing={1} sx={{ p: 1 }}>
    {rows.map((row) => (
      <Fragment key={`grid-tooltip-${row.label}-${row.value}`}>
        <Grid item xs={7}>
          <Typography variant="body2">{row.label}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2">{row.value}</Typography>
        </Grid>
      </Fragment>
    ))}
  </Grid>
);

export default GridTooltipTitle;
