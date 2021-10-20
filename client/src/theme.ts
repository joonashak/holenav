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
});

theme = createTheme(theme, {
  palette: {
    background: {
      paper: theme.palette.primary.dark,
    },
  },

  typography: {
    h2: {
      fontSize: "1.8rem",
      fontWeight: 400,
      color: theme.palette.secondary.light,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },
  },

  components: {
    MuiSelect: {
      styleOverrides: {
        icon: { color: theme.palette.secondary.light },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.primary.light,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: theme.palette.secondary.light,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
