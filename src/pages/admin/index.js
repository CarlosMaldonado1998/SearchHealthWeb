import withAuth from "../../hocs/withAuth";
import Head from "next/head";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Edit, Image } from "@material-ui/icons";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

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

function Home() {
  return (
    <>
      <Head>
        <title>Search Health</title>
      </Head>
      <div style={styles.Container}>
        <Typography variant="h4" gutterBottom style={styles.Title}>
          Bienvenido Administrador
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Paper style={styles.Paper} elevation={3}>
              <Typography variant="body1" align="justify">
                El sistema Search Health le permite realizar la gestión de
                centros médicos de la ciudad de Quito. Aquí podrá realizar las
                siguientes acciones:
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <AddCircleOutlineRoundedIcon style={styles.Icon} />
                  <Typography color={"secondary"}>Agregar </Typography>
                  <EditIcon style={styles.Icon} />
                  <Typography color={"secondary"}>Editar</Typography>

                  <UpdateIcon style={styles.Icon} />
                  <Typography color={"secondary"}>Actualizar</Typography>
                  <DeleteIcon style={styles.Icon} />
                  <Typography color={"secondary"}>Eliminar</Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Typography variant="h4" color={"secondary"}>
                    Centros Medicos
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <img src="maintenance.png" width={300} height={300} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default withAuth(Home);
