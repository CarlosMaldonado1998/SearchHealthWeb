import withAuth from "../../hocs/withAuth";

function MedicalCenters() {
  return (
    <>
      <div>Listado de centros médicos</div>
    </>
  );
}

export default withAuth(MedicalCenters);
