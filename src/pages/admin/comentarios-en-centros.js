import withAuth from "../../hocs/withAuth";
import Head from "next/head";
function Comments() {
  return (
    <>
      <Head>
        <title>Comentarios</title>
      </Head>
      <div>comentarios de centros médicos</div>
    </>
  );
}

export default withAuth(Comments);
