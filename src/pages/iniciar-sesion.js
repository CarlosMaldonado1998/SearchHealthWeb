import { Link as MuiLink, Typography } from "@material-ui/core";
import Link from "next/link";
import Routes from "../consants/routes";

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
    </>
  );
}

export default Login;
