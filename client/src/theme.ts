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
        root: {
          fontSize: "0.9rem",
        },
        containedPrimary: {
          backgroundColor: theme.palette.primary.dark,
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main,
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
