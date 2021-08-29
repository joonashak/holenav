import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";

export default createTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: blueGrey[600] },
    text: {
      primary: "#fff",
    },
  },
});
