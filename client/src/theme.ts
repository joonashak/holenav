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
    button: {
      fontSize: "0.9rem",
    },
    h1: {
      fontSize: "3rem",
      color: theme.palette.secondary.light,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 400,
      color: theme.palette.secondary.light,
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: 400,
    },
    body1: {
      color: theme.palette.primary.contrastText,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { overflow: "hidden" },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: theme.palette.secondary.light },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popupIndicator: { color: theme.palette.secondary.light },
        clearIndicator: { color: theme.palette.warning.dark },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.primary.light,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: theme.palette.secondary.light,
          "&.Mui-focused": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light,
          marginBottom: theme.spacing(1),
          "&.Mui-focused": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "0.85rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: theme.palette.primary.dark,
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.primary.dark,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          "&&": {
            paddingTop: theme.spacing(1),
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
