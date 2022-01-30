import { Box, Chip, Typography } from "@mui/material";

type DataChipProps = {
  label: string;
  value: number;
};

const DataChip = ({ label, value }: DataChipProps) => (
  <Chip
    sx={{
      width: 0.45,
      "& > span": { width: 1 },
      bgcolor: "primary",
      px: 2,
      py: 3,
    }}
    label={
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ alignSelf: "center" }}>
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
      </Box>
    }
  />
);

export default DataChip;
