import { FormControlLabel, FormControlLabelProps, FormGroup } from "@mui/material";

const FullsizeControl = (props: FormControlLabelProps) => (
  <FormGroup sx={{ borderBottom: "1px solid", borderBottomColor: "primary.light", mb: 2, pb: 1 }}>
    <FormControlLabel
      {...props}
      labelPlacement="start"
      componentsProps={{ typography: { sx: { flexGrow: 1 } } }}
    />
  </FormGroup>
);

export default FullsizeControl;
