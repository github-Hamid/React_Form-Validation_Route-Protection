import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import jwt_decode from "jwt-decode";

// allowedRoles are the array of roles for each route that have permission to enter
// roles are the array of roles for the user that wants to enter
function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || [];

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unAuthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
