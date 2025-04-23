import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContextxt";

function ProtectedRoute() {
  const { isAuthenticate, loading } = useAuthContext();

  if (loading) {
    <h1>Cargando...</h1>;
  }
  if (!loading && !isAuthenticate) {
    <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
