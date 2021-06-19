import withAuth from "../../hocs/withAuth";
import Head from "next/head";

function MedicalCenters() {
  return (
    <>
      <Head>
        <title>Centros Médicos</title>
      </Head>
      <div>Listado de centros médicos</div>
    </>
  );
}

export default withAuth(MedicalCenters);
