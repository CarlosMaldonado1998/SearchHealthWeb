import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../lib/auth";
import NProgress from "nprogress";
import Router from "next/router";

// Show a loading state
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
