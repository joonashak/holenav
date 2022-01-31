import { Box, Chip, ChipProps, Typography, TypographyProps } from "@mui/material";

type DataChipProps = {
  label: string;
  value: string | number;
  sx?: ChipProps["sx"];
  labelSx?: TypographyProps["sx"];
  valueSx?: TypographyProps["sx"];
  labelProps?: TypographyProps;
};

const DataChip = ({ label, value, sx, labelSx, valueSx, labelProps }: DataChipProps) => (
  <Chip
    sx={{
      width: 0.45,
      "& > span": { width: 1 },
      bgcolor: "primary",
      px: 2,
      py: 3,
      ...sx,
    }}
    label={
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ alignSelf: "center", ...labelSx }} {...labelProps}>
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 600, ...valueSx }}>{value}</Typography>
      </Box>
    }
  />
);

DataChip.defaultProps = {
  sx: {},
  labelSx: {},
  valueSx: {},
  labelProps: {},
};

export default DataChip;
