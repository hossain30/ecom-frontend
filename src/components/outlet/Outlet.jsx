// components/protectedRoute/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const [auth] = useAuth();

  return auth?.token ? <Outlet /> : <Navigate to={"/"} />;
};

export { ProtectedRoute };
