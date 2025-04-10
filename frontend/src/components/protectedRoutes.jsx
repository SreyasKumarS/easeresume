import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {

    return <Navigate to="/users/Login" replace />;
  }


  return children;
};

export default ProtectedRoute;
