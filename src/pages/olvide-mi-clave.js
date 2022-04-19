import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "../constants/routes";
import { useRouter } from "next/router";
import withoutAuth from "../hocs/withoutAuth";
import { useAuth } from "../lib/auth";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import translateMessage from "../utils/translateMessage";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import React from "react";
import Head from "next/head";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
});
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const styles = {
  Container: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: "60px",
  },
  paper: {
    padding: "35px",
  },
};
function RecoverPassword() {
  const router = useRouter();
  const { sendPasswordResetEmail } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSendEmail = async (data) => {
    try {
      await sendPasswordResetEmail(data.email);
      enqueueSnackbar(
        "Se ha enviado un mensaje al correo ingresado, en caso de no verlo en la bandeja de entrada porfavor revisa en la carpeta de correo no deseado",
        {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      router.push(Routes.LOGIN);
    } catch (error) {
      console.log(error.code);
      enqueueSnackbar(translateMessage(error.code), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Recuperar contraseña</title>
      </Head>
      <Container maxWidth="sm">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "70vh" }}
        >
          <Paper elevation={3} style={styles.paper}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h4" align="center">
                <strong>Recuperar contraseña</strong>
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(onSendEmail)}
                align="center"
              >
                <TextField
                  id="email"
                  name="email"
                  label="Correo electrónico"
                  {...register("email")}
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  color="primary"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <Button
                  onSubmit={handleSubmit(onSendEmail)}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  <Typography>
                    <strong>Enviar</strong>
                  </Typography>
                </Button>
              </form>
              <Typography align="center">
                <Link href={Routes.LOGIN} passHref>
                  <Button color="primary">Cancelar</Button>
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
export default withoutAuth(RecoverPassword);
