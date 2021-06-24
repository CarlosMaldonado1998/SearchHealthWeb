import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    // htmlFontSize: 16,
    h3: {
      marginBottom: "12px",
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#7BC2CA",
    },
    secondary: {
      main: "#ACCA7B",
    },
    tertiary: {
      main: "#D7A588",
    },
    cancel: {
      main: "#819EA6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#EDEBE6",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        // backgroundColor: "#ccc",
        width: "100%",
      },
    },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
});

export default theme;
