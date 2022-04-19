import Head from "next/head";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
const styles = {
  Container: {
    padding: "40px",
    textAlign: "center",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    margin: "10px",
    padding: "35px",
  },
  Title: {
    fontWeight: "bold",
    color: "black",
  },
  Icon: {
    color: "#ACCA7B",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  icon: {
    width: "200px",
    height: "80px",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Search Health</title>
      </Head>
      <div style={styles.Container}>
        <Typography variant="h4" gutterBottom style={styles.Title}>
          Search Health
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Paper style={styles.Paper} elevation={3}>
              <Typography variant="body1" align="justify">
                Descarga nuestra aplicación directamente en la Play Store.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body2" color={"secondary"}>
                    Busca centros médicos en base a tus necesidades.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Link
                    href="https://play.google.com/store/apps/details?id=io.ionic.searchHealth"
                    passHref
                  >
                    <ButtonBase focusRipple key={"Download"} target="_blank">
                      <img
                        style={{ width: "200px", height: "80px" }}
                        src="playstore.png"
                      />
                    </ButtonBase>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <img src="download.svg" width={300} height={300} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
