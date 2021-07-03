const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  RESET_PASSWORD: "/olvide-mi-clave",
  HOME: "/",
};

const privateRoutes = {
  REGISTER_MEDICAL_CENTER: "/admin/registrar",
  VIEW_MEDICAL_CENTER: "/admin/centros",
  VIEW_USERS: "/admin/usuarios",
  ADMIN: "/admin",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
