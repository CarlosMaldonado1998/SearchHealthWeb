import withAuth from "../../hocs/withAuth";
import Head from "next/head";

function Users() {
  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>
      <div>Lista de usuarios</div>
    </>
  );
}

export default withAuth(Users);
