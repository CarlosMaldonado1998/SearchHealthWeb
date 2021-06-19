import withAuth from "../../hocs/withAuth";

function Home() {
  return (
    <>
      <div>Home</div>
      <div>Bienvenido Administrador</div>
    </>
  );
}

export default withAuth(Home);
