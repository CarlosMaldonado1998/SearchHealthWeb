import { useEffect } from "react";
import { Container, Grid, ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../lib/auth";
import NProgress from "nprogress";
import Router from "next/router";
import styles from "../styles/App.module.css";
import MainMenu from "../components/MainMenu";

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
            <div className={styles.main}>
              <MainMenu />
              <Container maxWidth="lg" className={styles.container}>
                <div style={{ paddingLeft: 50 }}>
                  <Component {...pageProps} />
                </div>
              </Container>
              <footer className={styles.footer}>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Health <img src="/logo.png" className={styles.logo} />
                </a>
              </footer>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
