import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";


const RequireAuth = ({ children }) => {
  let location = useLocation();
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
