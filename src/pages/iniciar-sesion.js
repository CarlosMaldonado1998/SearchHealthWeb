import { Link as MuiLink, Typography } from "@material-ui/core";
import Link from "next/link";
import Routes from "../constants/routes";
import withoutAuth from "../hocs/withoutAuth";
function Login() {
  return (
    <>
      <Typography variant="h3" align="center">
        Iniciar sesión
      </Typography>

      <Typography variant="subtitle1" align="center">
        <Link href={Routes.HOME} passHref>
          <MuiLink>Ir a Home</MuiLink>
        </Link>
      </Typography>
      <Typography variant="subtitle1" align="center">
        <Link href={Routes.RESET_PASSWORD} passHref>
          <MuiLink>Recuperar Contraseña</MuiLink>
        </Link>
      </Typography>
    </>
  );
}

export default withoutAuth(Login);
