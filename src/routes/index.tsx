import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthContext from "../contexts/auth";
import AuthRoutes from "./auth.routes";
const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};
export default Routes;
