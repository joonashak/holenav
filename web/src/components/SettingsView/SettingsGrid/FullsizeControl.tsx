import { FormControlLabel, FormControlLabelProps } from "@mui/material";
import Row from "./Row";

const FullsizeControl = (props: FormControlLabelProps) => (
  <Row
    sx={{
      flexDirection: "column",
    }}
  >
    <FormControlLabel
      {...props}
      labelPlacement="start"
      componentsProps={{ typography: { sx: { flexGrow: 1 } } }}
      sx={{
        m: 0,
      }}
    />
  </Row>
);

export default FullsizeControl;
