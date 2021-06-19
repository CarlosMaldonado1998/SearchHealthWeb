const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  RESET_PASSWORD: "/olvide-mi-clave",
};

const privateRoutes = {
  HOME: "/",
  REGISTER_MEDICAL_CENTER: "/admin/registrar",
  VIEW_MEDICAL_CENTER: "/admin/listado-de-centros",
  VIEW_COMMENTS_MEDICAL_CENTER: "/admin/comentarios-en-centros",
  VIEW_USERS: "/admin/usuarios",
  ADMIN: "/admin",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
