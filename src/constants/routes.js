const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  RESET_PASSWORD: "/olvide-mi-clave",
};

const privateRoutes = {
  HOME: "/",
  // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
