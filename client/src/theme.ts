import {
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@material-ui/core";
import { grey, lightGreen } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: lightGreen[600] },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },
  },
});

export default responsiveFontSizes(theme);
