import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";
import withAuth from "../../hocs/withAuth";

function Register() {
  return (
    <>
      <Head>
        <title>Sobre nosotros</title>
      </Head>

      <Typography>Registrar datos de centros médicos</Typography>
    </>
  );
}
export default withAuth(Register);
