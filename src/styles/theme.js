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
      main: "#7bc2ca",
    },
    secondary: {
      main: "#acca7b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#edebe6",
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
