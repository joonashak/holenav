import { Box, FormControlLabel, FormControlLabelProps } from "@mui/material";

const FullsizeControl = (props: FormControlLabelProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid",
      borderBottomColor: "primary.light",
    }}
  >
    <FormControlLabel
      {...props}
      labelPlacement="start"
      componentsProps={{ typography: { sx: { flexGrow: 1 } } }}
      sx={{
        ml: 0,
        mr: 0,
        pt: 1,
        pb: 1,
        "&:hover": { bgcolor: "rgba(0, 0, 0, 0.15)" },
      }}
    />
  </Box>
);

export default FullsizeControl;
