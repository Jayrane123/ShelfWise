import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/LocalStorage";

export function PrivateRoute() {
  const token = getToken();
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
} 
