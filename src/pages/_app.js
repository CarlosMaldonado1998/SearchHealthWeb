import "../styles/globals.css";
import { useEffect } from "react";
import theme from "../styles/theme";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS (Material UI fix).
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
