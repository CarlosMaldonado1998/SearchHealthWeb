import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "../constants/routes";
import withoutAuth from "../hocs/withoutAuth";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import translateMessage from "../utils/translateMessage";
import { useAuth } from "../lib/auth";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  password: yup
    .string()
    .required("Ingrese su clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
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

function Login() {
  const { login } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password).then(
        enqueueSnackbar("Acceso exitoso", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }),
        router.push(Routes.HOME)
      );
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
            <Grid>
              <Typography variant="h4" align="center">
                <strong>Inicio de Sesión</strong>
              </Typography>
              <Typography variant="h5" align="center">
                Solo personal administrativo
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                align="center"
              >
                <TextField
                  id="email"
                  name="email"
                  label="Correo electrónico"
                  inputRef={register}
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  color="primary"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  inputRef={register}
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  color="primary"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  onSubmit={handleSubmit(onSubmit)}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  <Typography>
                    <strong>Ingresar</strong>
                  </Typography>
                </Button>
              </form>
              <Typography align="center">
                <Link href={Routes.RESET_PASSWORD} passHref>
                  <Button color="primary">Recuperar Contraseña</Button>
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}

export default withoutAuth(Login);
