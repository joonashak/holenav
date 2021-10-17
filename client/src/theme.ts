import { responsiveFontSizes, createTheme } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: lightGreen[600] },
    text: {
      primary: "#fff",
    },
  },

  typography: {
    h2: {
      fontSize: "1.8rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiSelect: {
      styleOverrides: {
        outlined: {
          border: `1px solid ${theme.palette.primary.light}`,
        },
        icon: { color: theme.palette.secondary.light },
      },
    },
  },
});

export default responsiveFontSizes(theme);
