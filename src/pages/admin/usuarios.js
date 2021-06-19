import withAuth from "../../hocs/withAuth";

function Users() {
  return (
    <>
      <div>Lista de usuarios</div>
    </>
  );
}

export default withAuth(Users);
