import withAuth from "../../hocs/withAuth";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Search Health</title>
      </Head>
      <div>Home</div>
      <div>Bienvenido Administrador</div>
      <h2>Sección informativa en construcción</h2>
    </>
  );
}

export default withAuth(Home);
